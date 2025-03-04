import axios from "axios";

const API_BASE_URL = "https://fakestoreapi.com";

export const getAllUsers = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/users`);
        return response.data;
    } catch (error) {
        throw new Error("Error fetching users");
    }
};

export const getSingleUser = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/users/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching user with ID ${id}`);
    }
};

export const addNewUser = async (userData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/users`, userData);
        return response.data;
    } catch (error) {
        throw new Error("Error adding new user");
    }
};

export const updateUser = async (id, updatedData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/users/${id}`, updatedData);
        return response.data;
    } catch (error) {
        throw new Error(`Error updating user with ID ${id}`);
    }
};

export const deleteUser = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/users/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error deleting user with ID ${id}`);
    }
};
