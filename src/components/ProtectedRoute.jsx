import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("authToken");

  if (!isLoggedIn) {
    return <Navigate to="/login-selection" replace />;
  }

  return children;
};

export default ProtectedRoute;
