import { Navigate, Outlet } from "react-router-dom";
import React from "react";

const ProtectedAdmin = ({isAuthenticated}) => {

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedAdmin;
