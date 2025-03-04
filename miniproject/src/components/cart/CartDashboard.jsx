import React, { useEffect } from "react";
import {
  Box,
  Button,
  SimpleGrid,
  Card,
  CardBody,
  Heading,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { useCartStore } from "../../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import Menu from "../admin/Menu";
import CartHead from "./Header/CartHead";

const CartDashboard = () => {
  const { fetchCarts, carts, loading, error, calculateTotal } = useCartStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCarts();
  }, []);

  return (
    <Box display="flex" minH="100vh" bg="gray.100">
      <Box width="250px" bg="white" boxShadow="md" minH="100vh">
        <Menu />
      </Box>

      <Box flex="1" p={6} ml="250px">
        <CartHead />

        {loading ? (
          <Spinner size="xl" />
        ) : error ? (
          <Box color="red.500">{error}</Box>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {carts.map((cart) => (
              <Card key={cart.id} boxShadow="md" p={4} borderRadius="md">
                <CardBody>
                  <Heading size="md">Order #{cart.id}</Heading>
                  <Text fontSize="sm" color="gray.500">
                    Date: {new Date(cart.date).toLocaleDateString()}
                  </Text>
                  <Text mt={2}>
                    <strong>Customer ID:</strong> {cart.userId}
                  </Text>
                  <Text>
                    <strong>Total:</strong> ${calculateTotal(cart).toFixed(2)}
                  </Text>
                  <Button
                    colorScheme="blue"
                    mt={3}
                    onClick={() => navigate(`/order/${cart.id}`)}
                  >
                    Show Details
                  </Button>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        )}
      </Box>
    </Box>
  );
};

export default CartDashboard;
