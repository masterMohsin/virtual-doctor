import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginSelection() {
  const navigate = useNavigate();

  const handleLogin = (role) => {
    // Save the selected role for future visits
    localStorage.setItem("userRole", role);

    // Navigate to login page of that role
    navigate(`/${role}/login`);
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userRole = localStorage.getItem("userRole");

    if (token && userRole) {
      // If logged in, go directly to dashboard
      navigate(`/${userRole}/dashboard`, { replace: true });
    } else if (!token && userRole) {
      // If not logged in but role is saved, go to its login page
      navigate(`/${userRole}/login`, { replace: true });
    }
  }, [navigate]);

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-white overflow-hidden">
      {/* Background blobs */}
      <div className="absolute bg-[#0EBE7E] rounded-full w-[450px] h-[450px] md:w-[1000px] md:h-[1000px] blur-2xl bottom-10 left-1/3 opacity-60 z-0"></div>
      <div className="absolute bg-[#61CEFF] rounded-full w-[450px] h-[450px] md:w-[1000px] md:h-[1000px] blur-2xl top-10 right-1/3 opacity-60 z-0"></div>

      {/* Center Card */}
      <div className="relative z-10 w-full max-w-xl px-6">
        <div className="p-8 md:p-12 text-center bg-white/20 backdrop-blur-md rounded-xl border border-white/30 shadow-lg">

          {/* Logo */}
          <div className="flex justify-center items-center mb-6">
            <img src="/imgs/plus-logo.png" className="w-32 h-32 object-contain" alt="logo" />
          </div>

          {/* Title */}
          <div className="flex items-center justify-center text-black my-4">
            <hr className="border w-20" />
            <h2 className="mx-4 text-xl font-semibold">Start As</h2>
            <hr className="border w-20" />
          </div>

          {/* Buttons */}
          <button
            onClick={() => handleLogin("doctor")}
            className="w-[60%] bg-[#0EBE7F] text-white text-2xl py-3 cursor-pointer rounded-lg font-medium hover:bg-green-700 transition mb-4"
          >
            Doctor
          </button>

          <p className="my-2 text-center text-black font-medium text-xl">or</p>

          <button
            onClick={() => handleLogin("patient")}
            className="w-[60%] bg-[#0EBE7F] text-white py-3 cursor-pointer rounded-lg text-2xl font-medium hover:bg-green-700 transition"
          >
            Patient
          </button>
        </div>
      </div>
    </div>
  );
}
  