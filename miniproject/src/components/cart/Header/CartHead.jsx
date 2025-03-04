import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";

const CartHead = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box bg="gray.100" p={4} mb={4} boxShadow="md">
      <Flex justify="space-between" align="center">
        <Heading size="md">Order Management</Heading>
        <Flex gap={3}>
          {location.pathname !== "/manage-orders" && (
            <Button colorScheme="gray" onClick={() => navigate("/manage-orders")}>
              Back to Dashboard
            </Button>
          )}
          <Button colorScheme="blue" onClick={() => navigate("/create-order")}>
            Create Order
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default CartHead;
