import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginSelection() {
  const navigate = useNavigate();

  const handleLogin = (role) => {
    localStorage.setItem("userRole", role);
    navigate(`/${role}/login`);
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userRole = localStorage.getItem("userRole");

    if (token && userRole) {
      navigate(`/${userRole}/dashboard`, { replace: true });
    } else if (!token && userRole) {
      navigate(`/${userRole}/login`, { replace: true });
    }
  }, [navigate]);

  return (
    <div className="relative w-full min-h-screen flex flex-col md:flex-row items-center justify-center bg-[#0f0f0f] overflow-hidden">
      {/* Wave Animations */}
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
      <div className="absolute w-[300px] h-[400px] md:w-[540px] md:h-[700px] bg-gradient-to-tr from-green-400 via-emerald-500 to-cyan-400 opacity-60 rounded-[40%] -left-1/4 -top-[40%] md:-left-1/2 md:-top-[70%] wave z-0"></div>
      <div className="absolute w-[300px] h-[400px] md:w-[540px] md:h-[700px] bg-gradient-to-tr from-green-400 via-emerald-500 to-cyan-400 opacity-60 rounded-[40%] -left-1/4 top-[30%] md:-left-1/2 md:top-[30%] wave z-0 delay-1000"></div>

      {/* Left Section (desktop only) */}
      <div className="hidden md:flex w-1/2 bg-[#0EBE7F] p-6 lg:p-10 flex-col justify-center items-start h-screen relative">
        <div className="bg-white/10 backdrop-blur-md p-4 rounded-full mb-6 shadow-xl">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-14 h-14 text-white" fill="white" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M19.4133 4.89862L14.5863 2.17544C12.9911 1.27485 11.0089 1.27485 9.41368 2.17544L4.58674 4.89862C2.99153 5.7992 2 7.47596 2 9.2763V14.7235C2 16.5238 2.99153 18.2014 4.58674 19.1012L9.41368 21.8252C10.2079 22.2734 11.105 22.5 12.0046 22.5C12.6952 22.5 13.3874 22.3657 14.0349 22.0954C14.2204 22.018 14.4059 21.9273 14.5872 21.8252L19.4141 19.1012C19.9765 18.7831 20.4655 18.3728 20.8651 17.8825C21.597 16.9894 22 15.8671 22 14.7243V9.27713C22 7.47678 21.0085 5.7992 19.4133 4.89862Z"
            />
          </svg>
        </div>

        <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight drop-shadow-md">Welcome to</h1>
        <h2 className="text-3xl lg:text-4xl font-bold text-white mt-2 tracking-wide">Virtual Doctor</h2>
        <p className="mt-4 text-base lg:text-lg font-medium text-white/90 max-w-md">
          Your smart healthcare companion. Connect, consult, and care — all in one place.
        </p>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center relative py-8 md:py-0">
        <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md h-[70vh] md:h-auto bg-white/5 rounded-2xl border border-white/10 backdrop-blur-lg p-6 sm:p-8 overflow-hidden mx-4 z-10 flex flex-col justify-center">
          
          {/* Mobile Welcome Header (inside card, hidden on desktop) */}
          <div className="md:hidden text-center mb-6">
            <h1 className="text-2xl font-extrabold text-white drop-shadow-md">Welcome to</h1>
            <h2 className="text-xl font-bold text-white mt-1 tracking-wide">Virtual Doctor</h2>
          </div>

          <div className="flex justify-center items-center mb-4 sm:mb-6">
            <img src="/imgs/plus-logo.png" className="w-24 h-24 sm:w-32 sm:h-32 object-contain" alt="logo" />
          </div>

          <div className="text-white text-center mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold">Continue As</h2>
            <div className="flex items-center justify-center mt-3 sm:mt-4">
              <hr className="border-t border-white/30 w-12 sm:w-20" />
              <span className="mx-3 sm:mx-4 text-sm sm:text-base text-white/60">Select Role</span>
              <hr className="border-t border-white/30 w-12 sm:w-20" />
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:gap-6">
            <button
              onClick={() => handleLogin("doctor")}
              className="w-full bg-emerald-500 hover:bg-emerald-400 transition-colors text-white py-3 sm:py-4 rounded-lg font-semibold text-lg sm:text-xl cursor-pointer"
            >
              Doctor
            </button>

            <button
              onClick={() => handleLogin("patient")}
              className="w-full bg-emerald-500 hover:bg-emerald-400 transition-colors text-white py-3 sm:py-4 rounded-lg font-semibold text-lg sm:text-xl cursor-pointer"
            >
              Patient
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
