// src/context/AuthContext.jsx
import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Safe parsing: fallback to null if nothing in localStorage
    const storedUser = localStorage.getItem("user");
    try {
      setUser(storedUser ? JSON.parse(storedUser) : null);
    } catch (err) {
      console.error("Error parsing user from localStorage:", err);
      setUser(null);
    }
  }, []);

  // Example login function (optional)
  // const userLogin = (email, password) => {
  //   let user = null;
  //   if (email === "doctor@example.com" && password === "123") {
  //     user = { role: "doctor", token: "mock-doctor-token" };
  //   } else if (email === "patient@example.com" && password === "123") {
  //     user = { role: "patient", token: "mock-patient-token" };
  //   } else {
  //     return { success: false };
  //   }
  //   setUser(user);
  //   localStorage.setItem("user", JSON.stringify(user));
  //   localStorage.setItem("token", user.token);
  //   localStorage.setItem("role", user.role);
  //   return { success: true, ...user };
  // };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Must be declared *after* AuthContext to avoid HMR issue
export const useAuth = () => useContext(AuthContext);
