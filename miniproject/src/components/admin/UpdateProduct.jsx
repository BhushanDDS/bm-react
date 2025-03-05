import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useProductStore } from "../../contexts/ProductContext";
import {
  Box,
  Input,
  Button,
  FormControl,
  FormLabel,
  Textarea,
  useToast,
  FormErrorMessage,
} from "@chakra-ui/react";
import Head from "./Header/Head";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const { updateProduct } = useProductStore();
  const location = useLocation();
  const existingProduct = location.state || {};

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: existingProduct.title || "",
      price: existingProduct.price || "",
      description: existingProduct.description || "",
      category: existingProduct.category || "",
      image: existingProduct.image || "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (updatedData) => {
      await updateProduct(id, updatedData);
    },
    onSuccess: () => {
      toast({
        title: "Product Updated",
        description: "The product has been updated successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate(`/product/${id}`);
    },
    onError: () => {
      toast({
        title: "Update Failed",
        description: "Something went wrong. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <Box maxW="500px" mx="auto" mt={8} p={6} boxShadow="md">
      <Head />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl mb={4} isInvalid={errors.title}>
          <FormLabel>Title</FormLabel>
          <Input {...register("title", { required: "Title is required" })} />
          <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
        </FormControl>

        <FormControl mb={4} isInvalid={errors.price}>
          <FormLabel>Price</FormLabel>
          <Input
            type="number"
            {...register("price", {
              required: "Price is required",
              valueAsNumber: true,
              min: { value: 1, message: "Price must be at least 1" },
            })}
          />
          <FormErrorMessage>{errors.price?.message}</FormErrorMessage>
        </FormControl>

        <FormControl mb={4} isInvalid={errors.description}>
          <FormLabel>Description</FormLabel>
          <Textarea {...register("description", { required: "Description is required" })} />
          <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
        </FormControl>

        <FormControl mb={4} isInvalid={errors.category}>
          <FormLabel>Category</FormLabel>
          <Input {...register("category", { required: "Category is required" })} />
          <FormErrorMessage>{errors.category?.message}</FormErrorMessage>
        </FormControl>

        <FormControl mb={4} isInvalid={errors.image}>
          <FormLabel>Image URL</FormLabel>
          <Input {...register("image", { required: "Image URL is required" })} />
          <FormErrorMessage>{errors.image?.message}</FormErrorMessage>
        </FormControl>

        <Button colorScheme="blue" mr={3} type="submit" isLoading={isSubmitting || mutation.isLoading}>
          Update Product
        </Button>
        <Button onClick={() => navigate(-1)}>Cancel</Button>
      </form>
    </Box>
  );
};

export default UpdateProduct;
