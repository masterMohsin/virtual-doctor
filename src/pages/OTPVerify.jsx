import React, { useEffect, useRef, useState } from "react"

const OTPVerification = () => {
  const messages = [
    "OTP expires in 30 seconds..",
    "Securely verifying your identity..",
    "Your privacy is our priority..",
  ];
  const [messageIndex, setMessageIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingText, setTypingText] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);
  const timerRef = useRef(null);

  // Typing animation
  useEffect(() => {
    const handleType = () => {
      const current = messages[messageIndex];
      if (!isDeleting) {
        setTypingText(current.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
        if (charIndex + 1 === current.length) {
          setIsDeleting(true);
        }
      } else {
        setTypingText(current.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
        if (charIndex - 1 === 0) {
          setIsDeleting(false);
          setMessageIndex((messageIndex + 1) % messages.length);
        }
      }
    };
    const timeout = setTimeout(handleType, isDeleting ? 40 : 80);
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, messageIndex]);

  // Countdown timer
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div className="bg-[#0f0f0f] flex items-center justify-center min-h-screen">
      <div className="flex flex-col md:flex-row w-full h-screen">
        {/* Left Section */}
        <div className="w-full md:w-1/2 bg-[#0EBE7F] text-white p-10 flex flex-col justify-center items-start h-full relative">
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-full mb-6 shadow-xl">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-14 h-14 text-white" fill="white" viewBox="0 0 24 24">
              <path fill="currentColor" d="M19.4133 4.89862L14.5863 2.17544C12.9911 1.27485 11.0089 1.27485 9.41368 2.17544L4.58674 4.89862C2.99153 5.7992 2 7.47596 2 9.2763V14.7235C2 16.5238 2.99153 18.2014 4.58674 19.1012L9.41368 21.8252C10.2079 22.2734 11.105 22.5 12.0046 22.5C12.6952 22.5 13.3874 22.3657 14.0349 22.0954C14.2204 22.018 14.4059 21.9273 14.5872 21.8252L19.4141 19.1012C19.9765 18.7831 20.4655 18.3728 20.8651 17.8825C21.597 16.9894 22 15.8671 22 14.7243V9.27713C22 7.47678 21.0085 5.7992 19.4133 4.89862Z" />
            </svg>
          </div>
          <div>
            <h1 className="text-5xl font-extrabold leading-tight drop-shadow-md">Verify OTP</h1>
            <h2 className="text-4xl font-bold text-white mt-2 tracking-wide">Virtual Doctor</h2>
            <p className="mt-4 text-lg font-medium text-white/90 max-w-md">
              Check your inbox for a 4-digit code to continue.
            </p>
          </div>
          <div className="h-10 text-lg mt-8 text-white font-mono">
            <span className="inline-block">{typingText}</span><span className="animate-pulse">|</span>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 flex items-center justify-center bg-[#0f0f0f]">
          <div className="relative w-full max-w-md bg-white/5 rounded-2xl border border-white/10 backdrop-blur-lg p-8 mx-4 overflow-hidden">
            {/* Waves */}
            <div className="absolute w-[540px] h-[700px] bg-gradient-to-tr from-green-400 via-emerald-500 to-cyan-400 opacity-60 rounded-[40%] -left-1/2 -top-[70%] animate-spin-slow"></div>
            <div className="absolute w-[540px] h-[700px] bg-gradient-to-tr from-green-400 via-emerald-500 to-cyan-400 opacity-60 rounded-[40%] -left-1/2 top-[30%] animate-spin-slow delay-1000"></div>

            {/* OTP Form */}
            <div className="relative z-10 text-white text-center mb-6">
              <h2 className="text-2xl font-bold">Enter the OTP</h2>
              <p className="text-sm text-white/60 mt-1">We sent a 4-digit code to your email</p>
            </div>

            <form className="relative z-10 flex flex-col gap-4 items-center">
              <div className="flex justify-center gap-4">
                {[...Array(4)].map((_, i) => (
                  <input
                    key={i}
                    type="number"
                    maxLength="1"
                    className="w-14 h-14 text-center text-xl font-bold bg-white/10 text-white rounded-lg outline-none focus:ring-2 ring-emerald-400"
                  />
                ))}
              </div>
              <p className="text-white/80 text-sm mt-2">Code expires in <span>{timeLeft}</span>s</p>
              <button
                type="submit"
                className="bg-emerald-500 hover:bg-emerald-400 transition-colors text-white py-2 px-6 rounded-lg font-semibold mt-2"
              >
                Verify OTP
              </button>
              <button
                disabled={timeLeft > 0}
                className={`text-sm underline mt-4 ${
                  timeLeft > 0 ? "text-white/30" : "text-green-400 hover:underline"
                }`}
              >
                Resend OTP
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
