// src/context/AuthContext.jsx
import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

 

 

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

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
