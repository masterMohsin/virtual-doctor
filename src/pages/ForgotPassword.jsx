import React, { useEffect, useState } from 'react';

const ForgotPassword = () => {
  const messages = [
    'We’ll help you get back in..',
    'Enter your email to recover access..',
    'Your account is safe with us..',
  ];

  const [messageIndex, setMessageIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    const current = messages[messageIndex];
    setDisplayText(current.substring(0, charIndex));

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < current.length) {
          setCharIndex((prev) => prev + 1);
        } else {
          setIsDeleting(true);
        }
      } else {
        if (charIndex > 0) {
          setCharIndex((prev) => prev - 1);
        } else {
          setIsDeleting(false);
          setMessageIndex((prev) => (prev + 1) % messages.length);
        }
      }
    }, isDeleting ? 40 : 80);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, messageIndex]);

  return (
    <div className="bg-[#0f0f0f] flex items-center justify-center min-h-screen p-0 m-0">
      <div className="flex flex-col md:flex-row w-full h-screen font-sans">
        {/* Left Section */}
        <div className="w-full md:w-1/2 bg-[#0EBE7F] text-white p-10 flex flex-col justify-center items-start h-full relative">
          {/* Logo Box */}
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-full mb-6 shadow-xl">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-14 h-14 text-white" fill="white" viewBox="0 0 24 24">
              <path fill="currentColor" d="M19.4133 4.89862L14.5863 2.17544C12.9911 1.27485 11.0089 1.27485 9.41368 2.17544L4.58674 4.89862C2.99153 5.7992 2 7.47596 2 9.2763V14.7235C2 16.5238 2.99153 18.2014 4.58674 19.1012L9.41368 21.8252C10.2079 22.2734 11.105 22.5 12.0046 22.5C12.6952 22.5 13.3874 22.3657 14.0349 22.0954C14.2204 22.018 14.4059 21.9273 14.5872 21.8252L19.4141 19.1012C19.9765 18.7831 20.4655 18.3728 20.8651 17.8825C21.597 16.9894 22 15.8671 22 14.7243V9.27713C22 7.47678 21.0085 5.7992 19.4133 4.89862Z" />
            </svg>
          </div>

          {/* Text */}
          <div>
            <h1 className="text-5xl font-extrabold leading-tight drop-shadow-md">Welcome to</h1>
            <h2 className="text-4xl font-bold text-white mt-2 tracking-wide">Virtual Doctor</h2>
            <p className="mt-4 text-lg font-medium text-white/90 max-w-md">
              Recover your account quickly and securely.
            </p>
          </div>

          {/* Typing Text */}
          <div className="h-10 text-lg mt-8 text-white font-mono">
            <span>{displayText}</span><span className="animate-pulse">|</span>
          </div>
        </div>

        {/* Right Section (Form) */}
        <div className="w-full md:w-1/2 flex items-center justify-center bg-[#0f0f0f]">
          <div className="relative w-full max-w-md bg-white/5 rounded-2xl border border-white/10 backdrop-blur-lg p-8 overflow-hidden mx-4">

            {/* Animated Waves */}
            <div className="absolute w-[540px] h-[700px] bg-gradient-to-tr from-green-400 via-emerald-500 to-cyan-400 opacity-60 rounded-[40%] -left-1/2 -top-[70%] animate-spin-slow z-0"></div>
            <div className="absolute w-[540px] h-[700px] bg-gradient-to-tr from-green-400 via-emerald-500 to-cyan-400 opacity-60 rounded-[40%] -left-1/2 top-[30%] animate-spin-slow z-0"></div>

            {/* Form Content */}
            <div className="relative z-10 text-white text-center mb-6">
              <h2 className="text-2xl font-bold">Forgot Your Password?</h2>
              <p className="text-sm text-white/60 mt-1">Enter your registered email to receive reset instructions.</p>
            </div>

            <form className="relative z-10 flex flex-col gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                required
                className="px-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/60 outline-none"
              />

              <button
                type="submit"
                className="bg-emerald-500 hover:bg-emerald-400 transition-colors text-white py-2 rounded-lg font-semibold text-sm"
              >
                <a href="/otp">Submit</a>
              </button>

              <p className="text-center text-white/60 text-sm">
                Remembered your password?
                <a href="/login" className="text-green-400 underline">Login here</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
