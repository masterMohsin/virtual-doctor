import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const role = localStorage.getItem("userRole");

    if (token) {
      navigate("/virtual-doctor"); // Already logged in → go to Home
    } else if (!role) {
      navigate("/login-selection"); // No role selected yet
    } else {
      navigate("/login"); // Role selected but not logged in yet
    }
  }, []);

  return null;
};

export default AuthRedirect;
