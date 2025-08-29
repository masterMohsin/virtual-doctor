import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

const DoctorLogin = () => {
  const [error, setError] = useState("");
  const { userLogin } = useAuth();
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const messages = [
    "Contact with doctors Globally..",
    "Make your Appointment online..",
    "Make your life Easy..",
  ];
  const [messageIndex, setMessageIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typedText, setTypedText] = useState("");

  // Typewriter effect
  useEffect(() => {
    const current = messages[messageIndex];
    let timeout;

    if (!isDeleting) {
      setTypedText(current.substring(0, charIndex));
      if (charIndex < current.length) {
        timeout = setTimeout(() => setCharIndex(charIndex + 1), 80);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 1200);
      }
    } else {
      setTypedText(current.substring(0, charIndex));
      if (charIndex > 0) {
        timeout = setTimeout(() => setCharIndex(charIndex - 1), 40);
      } else {
        setIsDeleting(false);
        setMessageIndex((messageIndex + 1) % messages.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, messageIndex]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setLogin((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const BASE_URL = import.meta.env.VITE_API_URL;
      const { email, password } = login;

      // ✅ withCredentials so cookies work
      const res = await axios.post(
        `${BASE_URL}/api/auth/login-doctor`,
        { email, password },
        { withCredentials: true }
      );

      if (res?.data?.success) {
        // ✅ role should come from backend
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role || "doctor");

        navigate("/doctor/dashboard");
        // update context if needed
        if (userLogin) userLogin(res.data.token, "doctor");

        
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full h-screen overflow-hidden bg-[#0f0f0f] text-white">
      {/* Left Section */}
      <div className="w-full md:w-1/2 bg-[#0EBE7F] p-10 flex flex-col justify-center items-start h-full relative">
        <div className="bg-white/10 backdrop-blur-md p-4 rounded-full mb-6 shadow-xl">
          {/* Logo */}
          <svg xmlns="http://www.w3.org/2000/svg" className="w-14 h-14 text-white" fill="white" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M19.4133 4.89862L14.5863 2.17544C12.9911 1.27485 11.0089 1.27485 9.41368 2.17544L4.58674 4.89862C2.99153 5.7992 2 7.47596 2 9.2763V14.7235C2 16.5238 2.99153 18.2014 4.58674 19.1012L9.41368 21.8252C10.2079 22.2734 11.105 22.5 12.0046 22.5C12.6952 22.5 13.3874 22.3657 14.0349 22.0954C14.2204 22.018 14.4059 21.9273 14.5872 21.8252L19.4141 19.1012C19.9765 18.7831 20.4655 18.3728 20.8651 17.8825C21.597 16.9894 22 15.8671 22 14.7243V9.27713C22 7.47678 21.0085 5.7992 19.4133 4.89862Z"
            />
          </svg>
        </div>

        <h1 className="text-5xl font-extrabold leading-tight drop-shadow-md">Welcome to</h1>
        <h2 className="text-4xl font-bold text-white mt-2 tracking-wide">Virtual Doctor</h2>
        <p className="mt-4 text-lg font-medium text-white/90 max-w-md">
          Your smart healthcare companion. Connect, consult, and care — all in one place.
        </p>

        <div className="h-10 text-lg mt-8 text-white font-mono">
          <span>{typedText}</span>
          <span className="animate-pulse">|</span>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-[#0f0f0f] relative">
        {/* Animated Waves */}
        <div className="absolute w-[540px] h-[700px] bg-gradient-to-tr from-green-400 via-emerald-500 to-cyan-400 opacity-60 rounded-[40%] -left-1/2 -top-[70%] animate-spin-slow z-0"></div>
        <div className="absolute w-[540px] h-[700px] bg-gradient-to-tr from-green-400 via-emerald-500 to-cyan-400 opacity-60 rounded-[40%] -left-1/2 top-[30%] animate-spin-slow z-0 delay-1000"></div>

        <div className="relative w-full max-w-md bg-white/5 rounded-2xl border border-white/10 backdrop-blur-lg p-8 overflow-hidden mx-4 z-10">
          <div className="text-white text-center mb-6">
            <h2 className="text-2xl font-semibold">Login to Your Account</h2>
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
            {error && <p className="text-center text-red-400 text-sm">{error}</p>}

            <div className="flex items-center justify-between text-sm text-white/80">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-green-500" />
                Remember me
              </label>
              <p onClick={() => navigate("/forgot-password")} className="text-green-400 hover:underline cursor-pointer">
                Forgot Password?
              </p>
            </div>

            <button type="submit" className="bg-emerald-500 hover:bg-emerald-400 transition-colors text-white py-2 rounded-lg font-semibold text-xl cursor-pointer">
              Login
            </button>

            <p className="text-center text-white/60 text-sm cursor-pointer">
              Don't have an account?{" "}
              <span onClick={() => navigate(`/doctor/register`)} className="text-green-400 underline">
                Sign up
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DoctorLogin;
