import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";

const Head = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box bg="gray.100" p={4} mb={4} boxShadow="md">
      <Flex justify="space-between" align="center">
        <Heading size="md">Admin Panel</Heading>
        <Flex gap={3}>
          {location.pathname !== "/dashboard" && (
            <Button colorScheme="gray" onClick={() => navigate("/dashboard")}>
              Back to Dashboard
            </Button>
          )}
          <Button colorScheme="blue" onClick={() => navigate("/create-product")}>
            Create Product
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Head;
