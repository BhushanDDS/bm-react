import axios from "axios";

const API_BASE_URL = "https://fakestoreapi.com";


export const getAllCarts = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/carts`);
        return response.data;
    } catch (error) {
        throw new Error("Error fetching carts (orders)");
    }
};

export const getSingleCart = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/carts/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching cart with ID ${id}`);
    }
};

export const createCart = async (cartData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/carts`, cartData);
        return response.data;
    } catch (error) {
        throw new Error("Error creating new order");
    }
};

export const updateCart = async (id, updatedCart) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/carts/${id}`, updatedCart);
        return response.data;
    } catch (error) {
        throw new Error(`Error updating cart with ID ${id}`);
    }
};

export const deleteCart = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/carts/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error deleting cart with ID ${id}`);
    }
};
