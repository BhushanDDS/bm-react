import React, { useMemo } from "react";
import {
  Box,
  SimpleGrid,
  Card,
  CardBody,
  Heading,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { useCartStore } from "../../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Menu from "../admin/Menu";
import CartHead from "./Header/CartHead";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const CartDashboard = () => {
  const { fetchCarts } = useCartStore();
  const navigate = useNavigate();

  const { data: carts = [], isLoading, error } = useQuery({
    queryKey: ["carts"],
    queryFn: fetchCarts,
  });

  const ordersByUser = useMemo(() => {
    if (!carts.length) return null;

    const userOrders = {};
    carts.forEach((cart) => {
      userOrders[cart.userId] = (userOrders[cart.userId] || 0) + 1;
    });

    return {
      labels: Object.keys(userOrders),
      datasets: [
        {
          label: "Orders per User",
          data: Object.values(userOrders),
          backgroundColor: "rgba(54, 162, 235, 0.6)",
        },
      ],
    };
  }, [carts]);

  const ordersOverTime = useMemo(() => {
    if (!carts.length) return null;

    const ordersByDate = {};
    carts.forEach((cart) => {
      const date = new Date(cart.date).toLocaleDateString();
      ordersByDate[date] = (ordersByDate[date] || 0) + 1;
    });

    return {
      labels: Object.keys(ordersByDate),
      datasets: [
        {
          label: "Orders Over Time",
          data: Object.values(ordersByDate),
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          fill: true,
        },
      ],
    };
  }, [carts]);

  return (
    <Box display="flex" minH="100vh" bg="gray.100">
      <Box width="250px" bg="white" boxShadow="md" minH="100vh">
        <Menu />
      </Box>

      <Box flex="1" p={6} ml="250px">
        <CartHead />

        {isLoading ? (
          <Spinner size="xl" />
        ) : error ? (
          <Box color="red.500">{error.message}</Box>
        ) : (
          <>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={6}>
              <Card boxShadow="md" p={4}>
                <CardBody>
                  <Heading size="md" mb={4}>
                    Orders per User
                  </Heading>
                  {ordersByUser ? <Bar data={ordersByUser} /> : <Text>No Data Available</Text>}
                </CardBody>
              </Card>

              <Card boxShadow="md" p={4}>
                <CardBody>
                  <Heading size="md" mb={4}>
                    Orders Over Time
                  </Heading>
                  {ordersOverTime ? <Line data={ordersOverTime} /> : <Text>No Data Available</Text>}
                </CardBody>
              </Card>
            </SimpleGrid>

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

                    <button
                      style={{
                        marginTop: "10px",
                        padding: "8px 12px",
                        backgroundColor: "#3182ce",
                        color: "white",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                      onClick={() => navigate(`/order/${cart.id}`)}
                    >
                      Show Details
                    </button>
                  </CardBody>
                </Card>
              ))}
            </SimpleGrid>
          </>
        )}
      </Box>
    </Box>
  );
};

export default CartDashboard;
