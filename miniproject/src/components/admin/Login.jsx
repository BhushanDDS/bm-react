import React from "react";
import { useForm } from "react-hook-form";
import { loginapi } from "../../api/AdminApi";
import { useAuth } from "../../contexts/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { 
  FormControl, 
  FormLabel, 
  FormErrorMessage, 
  Input, 
  Button, 
  VStack, 
  Box, 
  Heading, 
  useToast 
} from "@chakra-ui/react";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  
  const { mutate, isPending } = useMutation({
    mutationFn: ({ username, password }) => loginapi(username, password),
    mutationKey: "LOGIN",
    onSuccess: () => {
      login();
      toast({
        title: "Login Successful",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/dashboard");
    },
    onError: () => {
      toast({
        title: "Invalid Credentials",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <VStack spacing={6} align="center" mt={10}>
      <Box p={8} boxShadow="lg" borderRadius="lg" w={{ base: "90%", md: "400px" }}>
        <Heading size="lg" mb={6} textAlign="center">Login</Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={errors.username} mb={4}>
            <FormLabel>Username:</FormLabel>
            <Input 
              type="text" 
              {...register("username", { required: "username is required" })} 
            />
            <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.password} mb={4}>
            <FormLabel>Password:</FormLabel>
            <Input 
              type="password" 
              {...register("password", {
                required: "Password is required",
                minLength: { value: 5, message: "Must be at least 5 characters" },
                maxLength: { value: 20, message: "Must be less than 20 characters" },
              })} 
            />
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          </FormControl>

          <Button 
            colorScheme="cyan" 
            type="submit" 
            isLoading={isPending} 
            width="full"
            mt={4}
          >
            Submit
          </Button>
        </form>
      </Box>
    </VStack>
  );
}

export default Login;
