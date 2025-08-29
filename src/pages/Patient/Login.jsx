import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/api.js";
import { useAuth } from "../../context/AuthContext.jsx";

const Login = () => {
  const navigate = useNavigate();
  const {userLogin} = useAuth()
  const [login, setLogin] = useState({ email: "", password: "" });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("userRole");
    if (token && role === "patient") {
      navigate("/patient/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setLogin((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login-patient", login);
console.log(res.data.user);

       if (res?.data?.success) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role || "patient");
        localStorage.setItem("user", JSON.stringify({
          id: res.data.user._id,
          fullName: res.data.user.fullName,
          email: res.data.user.email,
          role: res.data.role,
          token: res.data.token
        }));

        if (userLogin) userLogin(res.data.token, "doctor");

        navigate("/patient/dashboard");
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      // alert(err.response?.data?.error || "Something went wrong");
      console.log(err.message);
      
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full h-screen overflow-hidden bg-[#0f0f0f] text-white">
      {/* Left Section */}
      <div className="w-full md:w-1/2 bg-[#0EBE7F] p-10 flex flex-col justify-center items-start h-full relative">
        <h1 className="text-5xl font-extrabold">Welcome Patient</h1>
        <h2 className="text-4xl font-bold text-white mt-2">Virtual Doctor</h2>
        <p className="mt-4 text-lg">Your smart healthcare companion.</p>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <div className="w-full max-w-md bg-white/5 rounded-2xl border border-white/10 backdrop-blur-lg p-8 mx-4">
          <h2 className="text-2xl font-semibold text-center mb-6">Patient Login</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleInput}
              value={login.email}
              required
              className="px-4 py-2 rounded-lg bg-white/10 text-white"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleInput}
              value={login.password}
              required
              className="px-4 py-2 rounded-lg bg-white/10 text-white"
            />
            <button className="bg-emerald-500 py-2 rounded-lg text-xl font-semibold">
              Login
            </button>
            <p className="text-center text-white/60 text-sm cursor-pointer">
              Don't have an account?{" "}
              <span
                onClick={() => navigate(`/patient/register`)}
                className="text-green-400 underline"
              >
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
