import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Image,
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
import { useProductStore } from "../../contexts/ProductContext";
import Head from "./Header/Head";

const SingleProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const cancelRef = useRef();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { fetchProductById, deleteProduct } = useProductStore();

  const { data: product, isLoading, error } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
  });

  const handleDelete = () => {
    deleteProduct(id);
    toast({
      title: "Product Deleted",
      description: "The product has been deleted successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    navigate("/");
  };

  if (isLoading) return <Spinner />;
  if (error) return <Text color="red.500">Error: {error.message}</Text>;

  return (
    <Box textAlign="center" p={6} maxW="600px" mx="auto" boxShadow="md">
                        <Head />

      <Image
        src={product.image}
        alt={product.title}
        boxSize="200px"
        objectFit="contain"
        mx="auto"
      />
      <Heading size="lg" mt={4}>
        {product.title}
      </Heading>
      <Text fontSize="xl" fontWeight="bold" color="green.500">
        ${product.price}
      </Text>
      <Text mt={2}>{product.description}</Text>

      <Box mt={4}>
        <Button
          colorScheme="blue"
          mr={3}
          onClick={() => navigate(`/update-product/${id}`, { state: product })}
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
              Are you sure you want to delete <b>{product.title}</b>? This action cannot be undone.
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

export default SingleProduct;
