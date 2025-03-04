import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Text,
  Button,
  Heading,
  Spinner,
  useToast,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useUserStore } from "../../contexts/UserContext";
import HeadUser from "./Header/HeadUser";

const SingleUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const cancelRef = useRef();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { fetchUserById, removeUser } = useUserStore();

  const { data: user, isLoading, error } = useQuery({
    queryKey: ["user", id],
    queryFn: () => fetchUserById(id),
  });

  const handleDelete = () => {
    removeUser(id);
    toast({
      title: "User Deleted",
      description: "The user has been deleted successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    navigate("/manage-users");
  };

  if (isLoading) return <Spinner />;
  if (error) return <Text color="red.500">Error: {error.message}</Text>;

  return (
    <Box textAlign="center" p={6} maxW="600px" mx="auto" boxShadow="md">

        <HeadUser/>
      <Heading size="lg" mt={4}>
        {user.username}
      </Heading>
      <Text fontSize="xl" fontWeight="bold">
        Email: {user.email}
      </Text>
      <Text mt={2}>Phone: {user.phone}</Text>
      <Text mt={2}>Address: {user.address?.city}, {user.address?.street}</Text>

      <Box mt={4}>
        <Button
          colorScheme="blue"
          mr={3}
          onClick={() => navigate(`/update-user/${id}`, { state: user })}
        >
          Update
        </Button>
        <Button colorScheme="red" onClick={() => setIsDeleteOpen(true)}>
          Delete
        </Button>
      </Box>

      <AlertDialog
        isOpen={isDeleteOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsDeleteOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Confirm Deletion
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete <b>{user.username}</b>? This action cannot be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setIsDeleteOpen(false)}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  handleDelete();
                  setIsDeleteOpen(false);
                }}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default SingleUser;
