import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useCartStore } from "../../contexts/CartContext";
import { Box, Button, Heading, Input, List, ListItem, Text, useToast } from "@chakra-ui/react";
import CartHead from "./Header/CartHead";

const UpdateOrder = () => {
  const { id } = useParams();
  const { state: cartData } = useLocation();
  const navigate = useNavigate();
  const toast = useToast();
  const { updateCart } = useCartStore();

  const [updatedCart, setUpdatedCart] = useState(cartData || { products: [] });

  const handleQuantityChange = (index, value) => {
    const newProducts = [...updatedCart.products];
    newProducts[index].quantity = value;
    setUpdatedCart({ ...updatedCart, products: newProducts });
  };

  const handleUpdate = async () => {
    try {
      await updateCart(id, updatedCart);
      toast({
        title: "Order Updated",
        description: "The order has been updated successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/manage-orders");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update order.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={6} maxW="600px" mx="auto" boxShadow="md">
        <CartHead/>

      <Heading size="lg" textAlign="center" mb={4}>
        Update Order #{id}
      </Heading>

      <Text fontSize="lg">
        <strong>Customer:</strong> {updatedCart?.username || "Unknown"}
      </Text>

      <Heading size="md" mt={4}>
        Products
      </Heading>
      <List spacing={3} mt={2}>
        {updatedCart.products.map((product, index) => (
          <ListItem key={product.productId}>
            <Text>
              <strong>{product.name}</strong> (ID: {product.productId})
            </Text>
            <Input
              type="number"
              value={product.quantity}
              min="1"
              onChange={(e) => handleQuantityChange(index, Number(e.target.value))}
              width="100px"
              mt={1}
            />
          </ListItem>
        ))}
      </List>

      <Button colorScheme="blue" mt={4} onClick={handleUpdate}>
        Save Changes
      </Button>
      <Button colorScheme="gray" mt={4} ml={3} onClick={() => navigate(-1)}>
        Cancel
      </Button>
    </Box>
  );
};

export default UpdateOrder;
