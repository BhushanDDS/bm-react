import React, { useEffect } from "react";
import {
  Box,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Spinner,
  Heading,
} from "@chakra-ui/react";
import { useUserStore } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import Menu from "../admin/Menu";
import HeadUser from "./Header/HeadUser";

const UserDashboard = () => {
  const {
    fetchUsers,
    filteredUsers,
    setSearchQuery,
    searchQuery,
    loading,
    error,
  } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Box display="flex" minH="100vh" bg="gray.100">
      <Box width="250px" bg="white" boxShadow="md" minH="100vh">
        <Menu />
      </Box>
      <Box flex="1" p={6} ml="250px">
        <HeadUser />

        <Box p={6} bg="white" boxShadow="md" borderRadius="lg">
          <Heading size="lg" mb={4}>
            User Management
          </Heading>

          <Input
            placeholder="Search users by username..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            mb={6}
            width="100%"
          />

          {loading ? (
            <Spinner size="xl" />
          ) : error ? (
            <Box color="red.500">{error}</Box>
          ) : (
            <Box overflowX="auto">
              <Table variant="striped" colorScheme="gray" width="100%">
                <Thead>
                  <Tr>
                    <Th>ID</Th>
                    <Th>Username</Th>
                    <Th>Email</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {filteredUsers.map((user) => (
                    <Tr key={user.id}>
                      <Td>{user.id}</Td>
                      <Td>{user.username}</Td>
                      <Td>{user.email}</Td>
                      <Td>
                        <Button
                          colorScheme="blue"
                          size="sm"
                          onClick={() => navigate(`/user/${user.id}`)}
                        >
                          View User
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default UserDashboard;
