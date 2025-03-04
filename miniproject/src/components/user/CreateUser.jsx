import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Box, Button, FormControl, FormLabel, Input, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../contexts/UserContext";
import HeadUser from "../user/Header/HeadUser";

const CreateUser = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const queryClient = useQueryClient();
  const { addUser } = useUserStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const mutation = useMutation({
    mutationFn: addUser, 
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]); 
      toast({
        title: "User Created",
        description: "The new user has been added successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/manage-users");
    },
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
            Create User
          </Button>
          <Button ml={3} onClick={() => navigate("/manage-users")}>
            Cancel
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default CreateUser;
