import React, { useEffect, useState } from 'react';

const RegisterCard = () => {
  const messages = [
    "Contact with doctors Globally..",
    "Make your Appointment online..",
    "Make your life Easy..",
  ];
  const [messageIndex, setMessageIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typedText, setTypedText] = useState('');

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

  return (
    <div className="flex flex-col md:flex-row w-full h-screen bg-[#0f0f0f]">
      {/* Left Section */}
      <div className="w-full md:w-1/2 bg-[#0EBE7F] text-white p-10 flex flex-col justify-center items-start h-full relative">
        <div className="bg-white/10 backdrop-blur-md p-4 rounded-full mb-6 shadow-xl">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-14 h-14 text-white" fill="white" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M19.4133 4.89862L14.5863 2.17544C12.9911 1.27485 11.0089 1.27485 9.41368 2.17544L4.58674 4.89862C2.99153 5.7992 2 7.47596 2 9.2763V14.7235C2 16.5238 2.99153 18.2014 4.58674 19.1012L9.41368 21.8252C10.2079 22.2734 11.105 22.5 12.0046 22.5C12.6952 22.5 13.3874 22.3657 14.0349 22.0954C14.2204 22.018 14.4059 21.9273 14.5872 21.8252L19.4141 19.1012C19.9765 18.7831 20.4655 18.3728 20.8651 17.8825C21.597 16.9894 22 15.8671 22 14.7243V9.27713C22 7.47678 21.0085 5.7992 19.4133 4.89862Z"
            />
          </svg>
        </div>
        <div>
          <h1 className="text-5xl font-extrabold leading-tight drop-shadow-md">Welcome to</h1>
          <h2 className="text-4xl font-bold text-white mt-2 tracking-wide">Virtual Doctor</h2>
          <p className="mt-4 text-lg font-medium text-white/90 max-w-md">
            Your smart healthcare companion. Connect, consult, and care — all in one place.
          </p>
        </div>
        <div className="h-10 text-lg mt-8 text-white font-mono">
          <span className="inline-block">{typedText}</span><span className="animate-pulse">|</span>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-[#0f0f0f] relative">
        <div className="absolute w-[540px] h-[700px] bg-gradient-to-tr from-green-400 via-emerald-500 to-cyan-400 opacity-60 rounded-[40%] -left-1/2 -top-[70%] animate-spin-slow z-0"></div>
        <div className="absolute w-[540px] h-[700px] bg-gradient-to-tr from-green-400 via-emerald-500 to-cyan-400 opacity-60 rounded-[40%] -left-1/2 top-[30%] animate-spin-slow z-0 delay-1000"></div>

        <div className="relative w-full max-w-md bg-white/5 rounded-2xl border border-white/10 backdrop-blur-lg p-8 overflow-hidden mx-4 z-10">
          <div className="text-white text-center mb-6">
            <h2 className="text-2xl font-bold">Register Your Account</h2>
          </div>
          <form className="flex flex-col gap-4">
            <div className="flex items-center justify-center gap-2 text-white text-sm">
              <label htmlFor="imageUpload" className="flex items-center gap-2 cursor-pointer hover:text-green-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h4l2-3h6l2 3h4v13H3V7zm9 11a4 4 0 100-8 4 4 0 000 8z" />
                </svg>
                <span>Upload Image</span>
              </label>
              <input type="file" id="imageUpload" className="hidden" />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <input type="text" placeholder="Full Name" className="flex-1 px-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/60 outline-none" />
              <input type="email" placeholder="Email" className="flex-1 px-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/60 outline-none" />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <input type="password" placeholder="Password" className="flex-1 px-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/60 outline-none" />
              <input type="password" placeholder="Confirm Password" className="flex-1 px-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/60 outline-none" />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <input type="date" className="flex-1 px-4 py-2 rounded-lg bg-white/10 text-white outline-none" />
              <select className="flex-1 px-4 py-2 rounded-lg bg-white/10 text-white outline-none">
                <option disabled selected>Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <select className="flex-1 px-4 py-2 rounded-lg bg-white/10 text-white outline-none">
                <option disabled selected>Blood Group</option>
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>AB+</option>
                <option>AB-</option>
                <option>O+</option>
                <option>O-</option>
              </select>
              <input type="text" placeholder="Phone Number" className="flex-1 px-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/60 outline-none" />
            </div>
            <label className="flex items-center gap-2 text-white text-sm">
              <input type="checkbox" required className="accent-green-500" />
              I accept the Terms & Conditions
            </label>
            <button type="submit" className="bg-emerald-500 hover:bg-emerald-400 transition-colors text-white py-2 rounded-lg font-semibold text-sm">
              Register
            </button>
            <p className="text-center text-white/60 text-sm">
              Already have an account? <a href="/login" className="text-green-400 underline">Sign in</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterCard;
