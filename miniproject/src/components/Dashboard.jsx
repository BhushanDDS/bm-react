import React from "react";
import { Button, Box } from "@chakra-ui/react";
import { useAuth } from "../contexts/AuthContext";
import Menu from "../components/admin/Menu";
import ProductList from "./admin/ProductList";
import Head from "../components/admin/Header/Head";

function Dashboard() {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <Box display="flex">
      <Menu /> 
      <Box ml="200px" p={4} width="full">
        <Head />
        <Button colorScheme="cyan" onClick={handleLogout} mb={4}>
          Logout
        </Button>
        <ProductList />
      </Box>
    </Box>
  );
}

export default Dashboard;
