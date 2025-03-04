import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";

const HeadUser = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box bg="gray.100" p={4} mb={4} boxShadow="md">
      <Flex justify="space-between" align="center">
        <Heading size="md">User Management</Heading>
        <Flex gap={3}>
          {location.pathname !== "/manage-users" && (
            <Button colorScheme="gray" onClick={() => navigate("/manage-users")}>
              Back to Dashboard
            </Button>
          )}
          <Button colorScheme="blue" onClick={() => navigate("/create-user")}>
            Create User
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default HeadUser;
