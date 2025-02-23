import React from 'react'
import { Navigate, Outlet } from "react-router-dom";

type ProtectedRouteProps = {
  isAuthenticated: boolean;
};

const ProtectedAdmin = ({ isAuthenticated }: ProtectedRouteProps) => {
  return <>{isAuthenticated ? <Outlet /> : <Navigate to="/" />}</>;
};

export default ProtectedAdmin;