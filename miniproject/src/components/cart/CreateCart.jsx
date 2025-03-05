import React from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../../contexts/CartContext";
import { useForm, useFieldArray } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import {
  Box,
  Button,
  Input,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";

const CreateCart = () => {
  const { createCart } = useCartStore();
  const navigate = useNavigate();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userId: "",
      products: [{ productId: "", quantity: 1 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });

  const mutation = useMutation({
    mutationFn: async (data) => {
      const newCart = { userId: data.userId, date: new Date().toISOString(), products: data.products };
      return await createCart(newCart);
    },
    onSuccess: () => {
      toast({
        title: "Cart Created",
        description: "The cart has been successfully created!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/manage-orders");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create cart.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });

  return (
    <Box maxW="400px" mx="auto" mt={6} p={4} boxShadow="md">
      <Heading size="md" textAlign="center">Create New Cart</Heading>
      <VStack as="form" onSubmit={handleSubmit(mutation.mutate)} spacing={4} mt={4}>
        <FormControl isInvalid={errors.userId}>
          <FormLabel>User ID</FormLabel>
          <Input
            {...register("userId", {
              required: "User ID is required",
              pattern: { value: /^[0-9]+$/, message: "User ID must be a number" },
            })}
            placeholder="Enter User ID"
          />
          <FormErrorMessage>{errors.userId?.message}</FormErrorMessage>
        </FormControl>

        {fields.map((field, index) => (
          <Box key={field.id} w="full">
            <FormControl isInvalid={errors.products?.[index]?.productId}>
              <FormLabel>Product ID</FormLabel>
              <Input
                {...register(`products.${index}.productId`, {
                  required: "Product ID is required",
                  pattern: { value: /^[0-9]+$/, message: "Product ID must be a number" },
                })}
                placeholder="Enter Product ID"
              />
              <FormErrorMessage>{errors.products?.[index]?.productId?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.products?.[index]?.quantity}>
              <FormLabel>Quantity</FormLabel>
              <Input
                {...register(`products.${index}.quantity`, {
                  required: "Quantity is required",
                  min: { value: 1, message: "Quantity must be at least 1" },
                })}
                placeholder="Enter Quantity"
                type="number"
              />
              <FormErrorMessage>{errors.products?.[index]?.quantity?.message}</FormErrorMessage>
            </FormControl>

            {fields.length > 1 && (
              <Button mt={2} colorScheme="red" onClick={() => remove(index)}>
                Remove Product
              </Button>
            )}
          </Box>
        ))}

        <Button onClick={() => append({ productId: "", quantity: 1 })} colorScheme="blue" variant="outline">
          Add Product
        </Button>

        <Button type="submit" colorScheme="green" isLoading={mutation.isLoading}>
          Create Order
        </Button>
      </VStack>
    </Box>
  );
};

export default CreateCart;
