import React from "react";
import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import Loader from "./ui/Loader";
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <Loader />;

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};
export default ProtectedRoute;
