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
  List,
  ListItem,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useCartStore } from "../../contexts/CartContext";
import CartHead from "./Header/CartHead";

const SingleOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const cancelRef = useRef();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { fetchCartById, removeCart, calculateTotal } = useCartStore();

  const { data: cart, isLoading, error } = useQuery({
    queryKey: ["cart", id],
    queryFn: async () => {
      const fetchedCart = await fetchCartById(id);
      return fetchedCart || {}; 
    },
  });

  const handleDelete = () => {
    removeCart(id);
    toast({
      title: "Order Deleted",
      description: "The order has been deleted successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    navigate("/manage-orders");
  };

  if (isLoading) return <Spinner />;
  if (error) return <Text color="red.500">Error: {error.message}</Text>;

  return (
    <Box>
      <CartHead />
      <Box textAlign="center" p={6} maxW="600px" mx="auto" boxShadow="md">
        <Heading size="lg" mt={4}>
          Order #{cart?.id}
        </Heading>
        <Text fontSize="sm" color="gray.500">
          Date: {cart?.date ? new Date(cart.date).toLocaleDateString() : "N/A"}
        </Text>
        <Text fontSize="lg" mt={2}>
          <strong>Customer ID:</strong> {cart?.userId || "Unknown"}
        </Text>
        <Text fontSize="lg" mt={2}>
  <strong>Customer:</strong> {cart?.username || "Unknown"}
</Text>

        <Text fontSize="xl" fontWeight="bold" color="green.500" mt={2}>
          Total: $
          {cart?.products ? calculateTotal(cart).toFixed(2) : "0.00"}
        </Text>

        <Heading size="md" mt={4}>
          Products
        </Heading>
        <List spacing={2} textAlign="left" mt={2}>
  {cart?.products?.map((product) => (
    <ListItem key={product.productId}>
      <Text>
        {product.quantity}x <strong>{product.name}</strong> (ID: {product.productId})
      </Text>
    </ListItem>
  )) || <Text>No products found</Text>}
</List>


        <Box mt={4}>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={() => navigate(`/update-order/${id}`, { state: cart })}
          >
            Update Order
          </Button>
          <Button colorScheme="red" onClick={() => setIsDeleteOpen(true)}>
            Delete Order
          </Button>
        </Box>
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
              Are you sure you want to delete <b>Order #{cart?.id}</b>? This action cannot be undone.
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

export default SingleOrder;
