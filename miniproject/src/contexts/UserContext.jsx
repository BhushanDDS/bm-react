import { create } from "zustand";
import {
  getAllUsers,
  getSingleUser,
  addNewUser,
  updateUser,
  deleteUser,
} from "../api/UserApi";
import { use } from "react";

export const useUserStore = create((set) => ({
  users: [],
  selectedUser: null,
  loading: false,
  error: null,
  searchQuery: "",
  filteredUsers: [],

  fetchUsers: async () => {
    set({ loading: true, error: null });
    try {
      const users = await getAllUsers();
      set({ users, filteredUsers: users, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  fetchUserById: async (id) => {
    set({ loading: true, error: null });
    try {
      const user = await getSingleUser(id);
      set({ selectedUser: user, loading: false });
      return user
    } catch (error) {
      set({ error: error.message, loading: false });
      return null
    }
  },

  addUser: async (newUser) => {
    try {
      const addedUser = await addNewUser(newUser);
      set((state) => ({ users: [...state.users, addedUser], filteredUsers: [...state.filteredUsers, addedUser] }));
    } catch (error) {
      set({ error: error.message });
    }
  },

  updateUserDetails: async (id, updatedData) => {
    try {
      const updatedUser = await updateUser(id, updatedData);
      set((state) => ({
        users: state.users.map((user) => (user.id === id ? updatedUser : user)),
        filteredUsers: state.filteredUsers.map((user) => (user.id === id ? updatedUser : user)),
      }));
    } catch (error) {
      set({ error: error.message });
    }
  },

  removeUser: async (id) => {
    try {
      await deleteUser(id);
      set((state) => ({
        users: state.users.filter((user) => user.id !== id),
        filteredUsers: state.filteredUsers.filter((user) => user.id !== id),
      }));
    } catch (error) {
      set({ error: error.message });
    }
  },

  setSearchQuery: (query) => {
    set((state) => ({
      searchQuery: query,
      filteredUsers: state.users.filter((user) =>
        user.username.toLowerCase().includes(query.toLowerCase())
      ),
    }));
  },
}));
