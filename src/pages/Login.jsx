import React from 'react';

export default function LoginSelection() {
  return (
    <>
      <div className="min-h-screen  flex flex-col items-center justify-center font-sans relative overflow-hidden bg-white">
        {/* Soft glowing circles in background [] */}
<div className="absolute bg-[#0EBE7E] rounded-full w-[450px] md:w-[1924px] md:h-[1924px]  h-[350px] blur-2xl bottom-[30%]  left-[30%]  opacity-[72%]"></div>
<div className="absolute bg-[#61CEFF] rounded-full w-[450px] md:w-[1924px] md:h-[1924px]  h-[350px] blur-2xl top-[30%] right-[30%] opacity-[72%]"></div>
        
        {/* Center container */}
        <div className="relative w-[50%]  p-10 md:p-16 text-center bg-white/10 backdrop-blur-md rounded-xl border border-white/30 shadow-lg">
          {/* Medical cross icon with heartbeat */}
          <div className="flex justify-center mb-10 bg-[#0EBE7E4D] opacity-[30%] rounded-full w-80 h-72 blur-md">
            {/* <svg className="w-20 h-20 stroke-green-600 stroke-2" fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 64 64">
              <path d="M32 4v56M12 32h40M24 44h16"/>
              <path d="M18 32l6-12 7 14 5-14" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg> */}
            <img src="./imgs/plus-logo.png" alt="" />
          </div>
          {/* Title with line */}
          <div className='flex justify-center flex-row items-center gap-2 text-[#000000] my-4'>
            <hr className='border w-14'/>
          <h2 className="relative text-[#000000] font-medium text-2xl mb- after:content-[''] after:block after:border-b after:border-gray-300 after:w-16 after:mx-auto after:mt-2">
            start as
          </h2>
          <hr className='border w-14'/>
          </div>
          {/* Buttons */}
          <button className="w-[60%] bg-[#0EBE7F] text-white text-3xl py-3 rounded-lg font-medium hover:bg-green-700 transition-colors mb-">
            Doctor
          </button>
          <p className="my-2 text-center text-[#000000] font-medium text-2xl">or</p>
          <button className="w-[60%] bg-[#0EBE7F] text-white py-3 rounded-lg text-3xl font-medium hover:bg-green-700 transition-colors">
            Patient
          </button>
        </div>
      </div>
    </>
  );
}

