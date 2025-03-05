import { create } from "zustand";
import { getAllCarts, getSingleCart, deleteCart,updateCart,createCart } from "../api/CartApi";
import axios from "axios";

export const useCartStore = create((set, get) => ({
  carts: [],
  selectedCart: null,
  loading: false,
  error: null,

  fetchCarts: async () => {
    set({ loading: true, error: null });
    try {
      const carts = await getAllCarts();
      console.log("Fetched Carts:", carts); 
      set({ carts, loading: false });
      return carts;
    } catch (error) {
      set({ error: error.message, loading: false });
      return null;
    }
  },
  fetchCartById: async (id) => {
    set({ loading: true, error: null });
    try {
      const cart = await getSingleCart(id);
  
      const updatedProducts = await Promise.all(
        cart.products.map(async (product) => {
          const response = await axios.get(`https://fakestoreapi.com/products/${product.productId}`);
          return { 
            ...product, 
            price: response.data.price, 
            name: response.data.title 
          };
        })
      );
  
      const userResponse = await axios.get(`https://fakestoreapi.com/users/${cart.userId}`);
      const username = userResponse.data.username;
  
      const updatedCart = { ...cart, products: updatedProducts, username };
      set({ selectedCart: updatedCart, loading: false });
      return updatedCart;
    } catch (error) {
      set({ error: error.message, loading: false });
      return null;
    }
  },


  updateCart: async (id, updatedCart) => {
    try {
      const response = await updateCart(id, updatedCart);

      set((state) => ({
        carts: state.carts.map((cart) => (cart.id === id ? response : cart)),
        selectedCart: response.id === state.selectedCart?.id ? response : state.selectedCart,
      }));

      return response;
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },
  
  createCart: async (newCart) => {
    try {
      const createdCart = await createCart(newCart);
      set((state) => ({
        carts: [...state.carts, createdCart], 
      }));
      return createdCart;
    } catch (error) {
      set({ error: error.message });
      return null;
    }
  },
  

  removeCart: async (id) => {
    try {
      await deleteCart(id);
      set((state) => ({
        carts: state.carts.filter((cart) => cart.id !== id),
      }));
      return true;
    } catch (error) {
      set({ error: error.message });
      return false;
    }
  },

  calculateTotal: (cart) => {
    if (!cart || !cart.products) return 0;
    return cart.products.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  },
}));
