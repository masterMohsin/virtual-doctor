// src/components/SuccessModal.jsx
import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const SuccessModal = ({ doctor, date, slot, onClose, onDone }) => {
  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white w-[90%] max-w-md rounded-2xl shadow-xl text-center p-8 relative">

        {/* Icon */}
        <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Thank You !</h2>
        <p className="text-gray-600 mb-4">Your Appointment Successful</p>

        {/* Appointment Details */}
        <p className="text-gray-700 text-sm mb-6 leading-relaxed">
          You booked an appointment with <br />
          <span className="font-semibold text-base">Dr. {doctor?.name}</span>,{" "}
          {doctor?.specialty} <br />
          on <b>{date}</b> at <b>{slot}</b>
        </p>

        {/* Done Button */}
        <button
          onClick={onDone}
          className="bg-[#0EBE7F] text-white font-semibold px-6 py-2 rounded-full hover:bg-[#0ac97c] transition"
        >
          Done
        </button>

        {/* Edit Option (Optional) */}
        <p
          onClick={onClose}
          className="text-sm text-blue-500 mt-3 underline cursor-pointer"
        >
          Edit your appointment
        </p>
      </div>
    </div>
  );
};

export default SuccessModal;
