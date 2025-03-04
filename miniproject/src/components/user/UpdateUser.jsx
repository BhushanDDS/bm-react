import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Box, Input, Button, FormControl, FormLabel, useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useUserStore } from "../../contexts/UserContext";
import HeadUser from "../user/Header/HeadUser";

const UpdateUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const queryClient = useQueryClient();
  const location = useLocation();
  const existingUser = location.state || {}; 

  const { updateUserDetails } = useUserStore(); 

  const [formData, setFormData] = useState({
    username: existingUser.username || "",
    email: existingUser.email || "",
    phone: existingUser.phone || "",
    city: existingUser.address?.city || "",
    street: existingUser.address?.street || "",
  });

  const mutation = useMutation({
    mutationFn: async (data) => updateUserDetails(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["user", id]); 
      toast({
        title: "User Updated",
        description: "User details have been successfully updated.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate(`/user/${id}`);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: formData,
  });

  const onSubmit = (data) => {
    mutation.mutate({
      ...data,
      address: { city: data.city, street: data.street }, 
    });
  };

  return (
    <Box>
      <HeadUser /> 
      
      <Box maxW="500px" mx="auto" mt={8} p={6} boxShadow="md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl mb={4} isInvalid={errors.username}>
            <FormLabel>Username</FormLabel>
            <Input {...register("username", { required: "Username is required" })} />
          </FormControl>

          <FormControl mb={4} isInvalid={errors.email}>
            <FormLabel>Email</FormLabel>
            <Input
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" },
              })}
            />
          </FormControl>

          <FormControl mb={4} isInvalid={errors.phone}>
            <FormLabel>Phone</FormLabel>
            <Input
              {...register("phone", {
                required: "Phone is required",
                minLength: { value: 10, message: "Enter a valid phone number" },
              })}
            />
          </FormControl>

          <FormControl mb={4} isInvalid={errors.city}>
            <FormLabel>City</FormLabel>
            <Input {...register("city", { required: "City is required" })} />
          </FormControl>

          <FormControl mb={4} isInvalid={errors.street}>
            <FormLabel>Street</FormLabel>
            <Input {...register("street", { required: "Street is required" })} />
          </FormControl>

          <Button colorScheme="blue" type="submit" isLoading={mutation.isLoading}>
            Update User
          </Button>
          <Button ml={3} onClick={() => navigate(-1)}>
            Cancel
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default UpdateUser;
