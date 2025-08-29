// import React from "react";
// import { Navigate, Outlet } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const ProtectedRoute = ({ allowedRoles }) => {
//   const { user } = useAuth();

//   if (!user) return <Navigate to="/login" replace />;

//   return allowedRoles.includes(user.role) ? (
//     <Outlet />
//   ) : (
//     <Navigate to="/login" replace />
//   );
// };

// export default ProtectedRoute;


// components/ProtectedRoute.jsx
// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");

  if (!token || userRole !== role) {
    return <Navigate to={`/${role}/login`} replace />;
  }

  return children;
};

export default ProtectedRoute;


