import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useProductStore } from "../../contexts/ProductContext";
import {
  Box,
  Input,
  Button,
  FormControl,
  FormLabel,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import Head from "./Header/Head";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const { updateProduct } = useProductStore();
  const location = useLocation();

  const existingProduct = location.state || {};
  
  const [formData, setFormData] = useState({
    title: existingProduct.title || "",
    price: existingProduct.price || "",
    description: existingProduct.description || "",
    category: existingProduct.category || "",
    image: existingProduct.image || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    await updateProduct(id, formData);

    toast({
      title: "Product Updated",
      description: "The product has been updated successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    navigate(`/product/${id}`);
  };

  return (
    <Box maxW="500px" mx="auto" mt={8} p={6} boxShadow="md">
        <Head/>
      <FormControl mb={4}>
        <FormLabel>Title</FormLabel>
        <Input name="title" value={formData.title} onChange={handleChange} />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Price</FormLabel>
        <Input
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Description</FormLabel>
        <Textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Category</FormLabel>
        <Input name="category" value={formData.category} onChange={handleChange} />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Image URL</FormLabel>
        <Input name="image" value={formData.image} onChange={handleChange} />
      </FormControl>

      <Button colorScheme="blue" mr={3} onClick={handleUpdate}>
        Update Product
      </Button>
      <Button onClick={() => navigate(-1)}>Cancel</Button>
    </Box>
  );
};

export default UpdateProduct;
