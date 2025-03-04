import axios from 'axios';

const API_BASE_URL = "https://fakestoreapi.com";

export const loginapi = async (username, password) => {
    try {
        const creds = { username, password };
        const response = await axios.post(`${API_BASE_URL}/auth/login`, creds);
        return response.data;
    } catch (error) {
        throw new Error("Error: Admin API login failed");
    }
};

export const getAllProductsApi = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/products`);
        return response.data;
    } catch (error) {
        throw new Error("Error: Unable to fetch products");
    }
};

export const getSingleProductsApi = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/products/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error: Unable to fetch product with ID ${id}`);
    }
};

export const deleteProductsApi = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/products/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error: Unable to delete product with ID ${id}`);
    }
};

export const updateProductsApi = async (id, updatedProduct) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/products/${id}`, updatedProduct);
        return response.data;
    } catch (error) {
        throw new Error(`Error: Unable to update product with ID ${id}`);
    }
};

export const createNewProductsApi = async (newProduct) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/products`, newProduct);
        return response.data;
    } catch (error) {
        throw new Error("Error: Unable to create new product");
    }
};


export const getAllCategories = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/products/categories`);
        return response.data;
    } catch (error) {
        throw new Error("Error: Unable to fetch categories");
    }
};

export const getProductByCategories = async (category) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/products/category/${category}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error: Unable to fetch products in category ${category}`);
    }
};
