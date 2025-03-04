import { create } from 'zustand'; 
import { 
    getAllProductsApi, 
    getSingleProductsApi, 
    createNewProductsApi, 
    updateProductsApi, 
    deleteProductsApi,
    getAllCategories,
    getProductByCategories
} from '../api/AdminApi';

export const useProductStore = create((set) => ({
    products: [],
    categories: [],
    selectedCategory: null,
    loading: false,
    error: null,

    fetchProducts: async () => {
        set({ loading: true, error: null });
        try {
            const data = await getAllProductsApi();
            set({ products: data, loading: false });
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    fetchProductById: async (id) => {
        set({ loading: true, error: null });
        try {
            const product = await getSingleProductsApi(id);
            return product;
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    fetchCategories: async () => {
        set({ loading: true, error: null });
        try {
            const categories = await getAllCategories();
            set({ categories, loading: false });
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    fetchProductsByCategory: async (category) => {
        set({ loading: true, error: null, selectedCategory: category });
        try {
            const products = await getProductByCategories(category);
            set({ products, loading: false });
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    addProduct: async (newProduct) => {
        try {
            const createdProduct = await createNewProductsApi(newProduct);
            set((state) => ({ products: [...state.products, createdProduct] }));
        } catch (error) {
            set({ error: error.message });
        }
    },

    updateProduct: async (id, updatedProduct) => {
        try {
            const updatedData = await updateProductsApi(id, updatedProduct);
            set((state) => ({
                products: state.products.map((product) => 
                    product.id === id ? updatedData : product
                )
            }));
        } catch (error) {
            set({ error: error.message });
        }
    },

    deleteProduct: async (id) => {
        try {
            await deleteProductsApi(id);
            set((state) => ({
                products: state.products.filter((product) => product.id !== id)
            }));
        } catch (error) {
            set({ error: error.message });
        }
    }
}));
