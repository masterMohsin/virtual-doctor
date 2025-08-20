import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PatientRegister = () => {
  const navigate = useNavigate();
  const typingRef = useRef(null);

  const [register, setRegister] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    dob: "",
    gender: "",
    bloodGroup: "",
    phoneNumber: "",
    profileImage: null,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Typing effect
  useEffect(() => {
    const messages = [
      "Contact with doctors Globally..",
      "Make your Appointment online..",
      "Make your life Easy..",
    ];

    let messageIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
      if (!typingRef.current) return;

      const current = messages[messageIndex];
      typingRef.current.textContent = current.substring(0, charIndex);

      if (!isDeleting) {
        charIndex++;
        if (charIndex > current.length) {
          isDeleting = true;
          setTimeout(type, 1200);
          return;
        }
      } else {
        charIndex--;
        if (charIndex < 0) {
          isDeleting = false;
          messageIndex = (messageIndex + 1) % messages.length;
        }
      }
      setTimeout(type, isDeleting ? 40 : 80);
    }

    type();
  }, []);

  // Input handler
  const handleInput = (e) => {
    const { name, value, files } = e.target;
    if (name === "profileImage") {
      setRegister((prev) => ({
        ...prev,
        profileImage: files[0],
      }));
    } else {
      setRegister((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    setMessage("");
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (register.password !== register.confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }
    setLoading(true);
    try {
      const API_BASE = import.meta.env.VITE_API_URL;
      const formData = new FormData();
      Object.entries(register).forEach(([key, value]) => {
        if (value) {
          formData.append(key, value);
        }
      });

      const res = await axios.post(
        `${API_BASE}/api/auth/register-patient`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        navigate("/patient/login");
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userRole", "patient");
        localStorage.setItem("patientId", res.data.patientId);
        setMessage("Registration successful!");
        setLoading(false);
      }

      // setTimeout(() => navigate("/patient/login"), 1500);
    } catch (error) {
      setLoading(false);
      setMessage(error.response?.data?.message || "Registration failed!");
    }
  };

  return (
    <div className="bg-[#0f0f0f] flex items-center justify-center min-h-screen">
      <style>
        {`
          @keyframes waveRotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .wave {
            animation: waveRotate 50s linear infinite;
          }
        `}
      </style>

      <div className="flex flex-col md:flex-row w-full h-screen">
        {/* Left Section */}
        <div className="w-full md:w-1/2 bg-[#0EBE7F] text-white p-10 flex flex-col justify-center items-start relative">
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-full mb-6 shadow-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-14 h-14 text-white"
              fill="white"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M19.4133 4.89862L14.5863 2.17544C12.9911 1.27485 11.0089 1.27485 9.41368 2.17544L4.58674 4.89862C2.99153 5.7992 2 7.47596 2 9.2763V14.7235C2 16.5238 2.99153 18.2014 4.58674 19.1012L9.41368 21.8252C10.2079 22.2734 11.105 22.5 12.0046 22.5C12.6952 22.5 13.3874 22.3657 14.0349 22.0954C14.2204 22.018 14.4059 21.9273 14.5872 21.8252L19.4141 19.1012C19.9765 18.7831 20.4655 18.3728 20.8651 17.8825C21.597 16.9894 22 15.8671 22 14.7243V9.27713C22 7.47678 21.0085 5.7992 19.4133 4.89862Z"
              />
            </svg>
          </div>
          <h1 className="text-5xl font-extrabold leading-tight">Welcome to</h1>
          <h2 className="text-4xl font-bold mt-2">Virtual Doctor</h2>
          <p className="mt-4 text-lg font-medium text-white/90 max-w-md">
            Your smart healthcare companion. Connect, consult, and care — all in
            one place.
          </p>
          <div className="h-10 text-lg mt-8 font-mono">
            <span ref={typingRef} className="inline-block"></span>
            <span className="animate-pulse">|</span>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 flex items-center justify-center bg-[#0f0f0f]">
          <div className="relative w-full max-w-xl bg-white/5 rounded-2xl border border-white/10 backdrop-blur-lg p-8 overflow-hidden mx-4">
            <div className="absolute w-[540px] h-[700px] bg-gradient-to-tr from-green-400 via-emerald-500 to-cyan-400 opacity-60 rounded-[40%] -left-1/2 -top-[70%] wave"></div>
            <div className="absolute w-[540px] h-[700px] bg-gradient-to-tr from-green-400 via-emerald-500 to-cyan-400 opacity-60 rounded-[40%] -left-1/2 top-[30%] wave"></div>

            <div className="relative z-10 text-white text-center mb-6">
              <h2 className="text-2xl font-bold">Register Your Account</h2>
            </div>

            <form
              onSubmit={handleSubmit}
              className="relative z-10 flex flex-col gap-4"
            >
              {/* Image Upload */}
              <div className="flex items-center justify-center gap-2 text-white text-sm">
                <label
                  htmlFor="imageUpload"
                  className="flex items-center gap-2 cursor-pointer hover:text-green-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 7h4l2-3h6l2 3h4v13H3V7zm9 11a4 4 0 100-8 4 4 0 000 8z"
                    />
                  </svg>
                  <span>Upload Image</span>
                </label>
                <input
                  type="file"
                  id="imageUpload"
                  className="hidden"
                  name="profileImage"
                  accept="image/*"
                  onChange={handleInput}
                />
              </div>

              {/* Name & Email */}
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="flex-1 px-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/60 outline-none"
                  required
                  name="fullName"
                  value={register.fullName}
                  onChange={handleInput}
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="flex-1 px-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/60 outline-none"
                  required
                  name="email"
                  value={register.email}
                  onChange={handleInput}
                />
              </div>

              {/* Passwords */}
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="password"
                  placeholder="Password"
                  className="flex-1 px-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/60 outline-none"
                  required
                  name="password"
                  value={register.password}
                  onChange={handleInput}
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="flex-1 px-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/60 outline-none"
                  required
                  name="confirmPassword"
                  value={register.confirmPassword}
                  onChange={handleInput}
                />
              </div>

              {/* DOB & Gender */}
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="date"
                  className="flex-1 px-4 py-2 rounded-lg bg-white/10 text-white outline-none"
                  required
                  name="dob"
                  value={register.dob}
                  onChange={handleInput}
                />
                <select
                  className="flex-1 px-4 py-2 rounded-lg bg-white/10 text-white outline-none"
                  name="gender"
                  value={register.gender}
                  onChange={handleInput}
                  required
                >
                  <option disabled value="">
                    Gender
                  </option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>

              {/* Blood Group & Phone */}
              <div className="flex flex-col sm:flex-row gap-4">
                <select
                  className="flex-1 px-4 py-2 rounded-lg bg-white/10 text-white outline-none"
                  name="bloodGroup"
                  value={register.bloodGroup}
                  onChange={handleInput}
                  required
                >
                  <option disabled value="">
                    Blood Group
                  </option>
                  <option>A+</option>
                  <option>A-</option>
                  <option>B+</option>
                  <option>B-</option>
                  <option>AB+</option>
                  <option>AB-</option>
                  <option>O+</option>
                  <option>O-</option>
                </select>
                <input
                  type="text"
                  placeholder="Phone Number"
                  className="flex-1 px-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/60 outline-none"
                  required
                  name="phoneNumber"
                  value={register.phoneNumber}
                  onChange={handleInput}
                />
              </div>

              {/* Terms */}
              <label className="flex items-center gap-2 text-white text-sm">
                <input type="checkbox" required className="accent-green-500" />I
                accept the Terms & Conditions
              </label>

              {/* Error/Success Message */}
              {message && (
                <div
                  className={`text-center mb-2 ${
                    message.includes("success")
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {message}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                className="bg-emerald-500 cursor-pointer hover:bg-emerald-400 transition-colors text-white py-2 rounded-lg font-semibold text-sm"
                disabled={loading}
              >
                {loading ? "Registering..." : "Register"}
              </button>

              {/* Login Link */}
              <p className="text-center text-white/60 text-sm">
                Already have an account?{" "}
                <span
                  onClick={() => navigate("/patient/login")}
                  className="text-green-400 underline cursor-pointer"
                >
                  Login
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientRegister;
