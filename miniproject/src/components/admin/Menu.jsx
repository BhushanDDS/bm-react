import React from "react";
import { Link } from "react-router-dom";
import { VStack, Box } from "@chakra-ui/react";

function Menu() {
  return (
    <Box
      w="200px"
      h="100vh"
      bg="gray.800"
      color="white"
      p={4}
      position="fixed"
      left={0}
      top={0}
    >
      <VStack align="start" spacing={4}>
        <Link to="/dashboard">Manage Product</Link>
        <Link to="/manage-users">Manage Users</Link>
        <Link to="/manage-orders">Manage Orders</Link>
      </VStack>
    </Box>
  );
}

export default Menu;
