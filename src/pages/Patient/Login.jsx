import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState({ email: "", password: "" });
  const [role, setRole] = useState(localStorage.getItem("userRole")); // doctor/patient

  // If already logged in → redirect to dashboard
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const savedRole = localStorage.getItem("userRole");
    if (token && savedRole) {
      navigate(`/${savedRole}/dashboard`);
    }
  }, [navigate]);

  // Handle input change
  const handleInput = (e) => {
    const { name, value } = e.target;
    setLogin((prev) => ({ ...prev, [name]: value }));
  };

  // Handle submit
  const handleSubmit = async (e) => {
  e.preventDefault();
  const BASE_URL = import.meta.env.VITE_API_URL;

  if (!BASE_URL) {
    alert("API URL is missing in environment variables!");
    return;
  }

  try {
    if (!role) {
      alert("Please select a role first from the selection page!");
      return;
    }

    const { email, password } = login;
    const endpoint =
      role === "doctor"
        ? `${BASE_URL}/api/auth/login-doctor`
        : `${BASE_URL}/api/auth/login-patient`;

    const res = await axios.post(endpoint, { email, password }, { withCredentials: true }); // 👈 important

    if (res.data.success) {
      // only save role & ids, NOT token
      localStorage.setItem("userRole", role);
      if (role === "patient" && res.data.patientId) {
        localStorage.setItem("patientId", res.data.patientId);
      }
      if (role === "doctor" && res.data.doctorId) {
        localStorage.setItem("doctorId", res.data.doctorId);
      }

      navigate(`/${role}/dashboard`);
    } else {
      alert(res.data.message || "Invalid credentials");
    }
  } catch (err) {
    console.error("Login failed", err);
    alert("Something went wrong. Please try again.");
  }
};


  return (
    <div className="flex flex-col md:flex-row w-full h-screen overflow-hidden bg-[#0f0f0f] text-white">
      {/* Left Section */}
      <div className="w-full md:w-1/2 bg-[#0EBE7F] p-10 flex flex-col justify-center items-start h-full relative">
        <h1 className="text-5xl font-extrabold leading-tight drop-shadow-md">
          Welcome to
        </h1>
        <h2 className="text-4xl font-bold text-white mt-2 tracking-wide">
          Virtual Doctor
        </h2>
        <p className="mt-4 text-lg font-medium text-white/90 max-w-md">
          Your smart healthcare companion.
        </p>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-[#0f0f0f] relative">
        <div className="relative w-full max-w-md bg-white/5 rounded-2xl border border-white/10 backdrop-blur-lg p-8 overflow-hidden mx-4 z-10">
          <div className="text-white text-center mb-6">
            <h2 className="text-2xl font-semibold">
              Login as {role ? role.toUpperCase() : "USER"}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleInput}
              value={login.email}
              required
              className="px-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/60 outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleInput}
              value={login.password}
              required
              className="px-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/60 outline-none"
            />
            <button
              type="submit"
              className="bg-emerald-500 hover:bg-emerald-400 transition-colors text-white py-2 rounded-lg font-semibold text-xl cursor-pointer"
            >
              Login
            </button>

            <p className="text-center text-white/60 text-sm cursor-pointer">
              Don't have an account?{" "}
              <span onClick={() => navigate(`/patient/register`)} className="text-green-400 underline">
                Sign up
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
