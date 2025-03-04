import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewProductsApi } from "../../api/AdminApi";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Head from "./Header/Head";

const CreateProduct = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const mutation = useMutation({
    mutationFn: createNewProductsApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]); 
      toast({
        title: "Product Created",
        description: "The new product has been added successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/dashboard");
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
          {errors.title && <p style={{ color: "red" }}>{errors.title.message}</p>}
        </FormControl>

        <FormControl mb={4} isInvalid={errors.price}>
          <FormLabel>Price</FormLabel>
          <Input
            type="number"
            {...register("price", {
              required: "Price is required",
              min: { value: 1, message: "Price must be greater than 0" },
            })}
          />
          {errors.price && <p style={{ color: "red" }}>{errors.price.message}</p>}
        </FormControl>

        <FormControl mb={4} isInvalid={errors.description}>
          <FormLabel>Description</FormLabel>
          <Textarea {...register("description", { required: "Description is required" })} />
          {errors.description && <p style={{ color: "red" }}>{errors.description.message}</p>}
        </FormControl>

        <FormControl mb={4} isInvalid={errors.category}>
          <FormLabel>Category</FormLabel>
          <Input {...register("category", { required: "Category is required" })} />
          {errors.category && <p style={{ color: "red" }}>{errors.category.message}</p>}
        </FormControl>

        <FormControl mb={4} isInvalid={errors.image}>
          <FormLabel>Image URL</FormLabel>
          <Input {...register("image", { required: "Image URL is required" })} />
          {errors.image && <p style={{ color: "red" }}>{errors.image.message}</p>}
        </FormControl>

        <Button colorScheme="blue" type="submit" isLoading={mutation.isLoading}>
          {mutation.isLoading ? <Spinner size="sm" /> : "Create Product"}
        </Button>
        <Button ml={3} onClick={() => navigate("/dashboard")}>
          Cancel
        </Button>
      </form>
    </Box>
  );
};

export default CreateProduct;
