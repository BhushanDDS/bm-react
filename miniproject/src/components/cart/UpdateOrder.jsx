import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { Box, Button, Heading, Input, List, ListItem, Text, useToast } from "@chakra-ui/react";
import CartHead from "./Header/CartHead";
import { useCartStore } from "../../contexts/CartContext";

const UpdateOrder = () => {
  const { id } = useParams();
  const { state: cartData } = useLocation();
  const navigate = useNavigate();
  const toast = useToast();
  const { updateCart } = useCartStore();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: cartData || { products: [] },
  });

  const mutation = useMutation({
    mutationFn: (updatedCart) => updateCart(id, updatedCart),
    onSuccess: () => {
      toast({
        title: "Order Updated",
        description: "The order has been updated successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/manage-orders");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update order.",
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
    <Box p={6} maxW="600px" mx="auto" boxShadow="md">
      <CartHead />
      <Heading size="lg" textAlign="center" mb={4}>
        Update Order #{id}
      </Heading>
      <Text fontSize="lg">
        <strong>Customer:</strong> {cartData?.username || "Unknown"}
      </Text>
      <Heading size="md" mt={4}>
        Products
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <List spacing={3} mt={2}>
          {cartData?.products.map((product, index) => (
            <ListItem key={product.productId}>
              <Text>
                <strong>{product.name}</strong> (ID: {product.productId})
              </Text>
              <Controller
                name={`products.${index}.quantity`}
                control={control}
                render={({ field }) => (
                  <Input type="number" {...field} min="1" width="100px" mt={1} />
                )}
              />
            </ListItem>
          ))}
        </List>
        <Button type="submit" colorScheme="blue" mt={4} isLoading={isSubmitting}>
          Save Changes
        </Button>
        <Button colorScheme="gray" mt={4} ml={3} onClick={() => navigate(-1)}>
          Cancel
        </Button>
      </form>
    </Box>
  );
};

export default UpdateOrder;