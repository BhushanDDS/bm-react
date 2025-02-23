import { Navigate, Outlet } from "react-router-dom";
import React from "react";
import { useAuth } from "../../contexts/AuthContext";

const ProtectedAdmin = () => {
  const { state } = useAuth();
  return state.isAuthenticated ? <Outlet /> : <Navigate to="/admin-login" />;
};

export default ProtectedAdmin;
