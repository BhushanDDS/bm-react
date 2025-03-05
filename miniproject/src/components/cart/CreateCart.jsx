import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../../contexts/CartContext";
import { useForm, useFieldArray } from "react-hook-form";
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

  // Initialize react-hook-form
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

  // Form submit handler
  const onSubmit = async (data) => {
    const newCart = { userId: data.userId, date: new Date().toISOString(), products: data.products };
    const createdCart = await createCart(newCart);

    if (createdCart) {
      toast({
        title: "Cart Created",
        description: "The cart has been successfully created!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/manage-orders");
    } else {
      toast({
        title: "Error",
        description: "Failed to create cart.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW="400px" mx="auto" mt={6} p={4} boxShadow="md">
      <Heading size="md" textAlign="center">Create New Cart</Heading>
      <VStack as="form" onSubmit={handleSubmit(onSubmit)} spacing={4} mt={4}>
        {/* User ID Input */}
        <FormControl isInvalid={errors.userId}>
          <FormLabel>User ID</FormLabel>
          <Input
            {...register("userId", {
              required: "User ID is required",
              pattern: {
                value: /^[0-9]+$/,
                message: "User ID must be a number",
              },
            })}
            placeholder="Enter User ID"
          />
          <FormErrorMessage>{errors.userId?.message}</FormErrorMessage>
        </FormControl>

        {/* Product Fields */}
        {fields.map((field, index) => (
          <Box key={field.id} w="full">
            {/* Product ID */}
            <FormControl isInvalid={errors.products?.[index]?.productId}>
              <FormLabel>Product ID</FormLabel>
              <Input
                {...register(`products.${index}.productId`, {
                  required: "Product ID is required",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Product ID must be a number",
                  },
                })}
                placeholder="Enter Product ID"
              />
              <FormErrorMessage>{errors.products?.[index]?.productId?.message}</FormErrorMessage>
            </FormControl>

            {/* Quantity */}
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

            {/* Remove Product Button */}
            {fields.length > 1 && (
              <Button
                mt={2}
                colorScheme="red"
                onClick={() => remove(index)}
              >
                Remove Product
              </Button>
            )}
          </Box>
        ))}

        {/* Add Product Button */}
        <Button onClick={() => append({ productId: "", quantity: 1 })} colorScheme="blue" variant="outline">
          Add Product
        </Button>

        {/* Submit Button */}
        <Button type="submit" colorScheme="green">Create Order</Button>
      </VStack>
    </Box>
  );
};

export default CreateCart;
