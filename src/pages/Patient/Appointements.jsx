
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Appointements = () => {
  const [appointments, setAppointments] = useState([]);

  // Load from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("appointments")) || [];
    setAppointments(stored);
  }, []);

  // Handle Deletion
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this appointment?"
    );
    if (!confirmDelete) return;

    const updated = appointments.filter((appt) => appt.id !== id);
    setAppointments(updated);
    localStorage.setItem("appointments", JSON.stringify(updated));
  };

  return (
    <div className="max-w-full  p-6">
      <h1 className="text-3xl font-bold  mb-6 text-green-700">
        Your Appointments
      </h1>

      {appointments.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          You have no upcoming appointments.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 min-h-full mt-16">
          {appointments.map((appt) => (
            <div
              key={appt.id}
              className=" items-center justify- bg-white p-4 rounded-xl shadow-md"
            >
              <div className="flex  gap-4">
                <img
                  src={appt.image}
                  className="w-20 h-20 rounded-md"
                  alt="Doctor"
                />
                <div>
                  <h2 className="font-semibold text-3xl text-[#333333]">
                    {appt.doctor}
                  </h2>
                </div>
                {/* <div>
                  <p className="text-gray-600">{appt.date} at {appt.slot}</p>
                </div> */}
              </div>

              <div className="flex justify-between px-5 mt-4">
                <div className="mb-2">
                  <h2 className="font-bold text-2xl">Date</h2>
                  <p className="text-xl font-semibold">{appt.date}</p>
                </div>
                <div className="mb-2 mr-5">
                  <p className="font-bold text-2xl">Time</p>
                  <p className="text-xl font-semibold">{appt.slot}</p>
                </div>
              </div>

              <div className="flex justify-between mr- px-5">
                <div className="mb-2">
                  <h2 className="font-bold text-2xl">Mode</h2>
                  <p className="text-xl font-semibold">In Clinic</p>
                </div>
                <div className="mb-4">
                  <h2 className="font-bold text-2xl">Status</h2>
                  <p className="text-[#16A34A] text-xl font-semibold">
                    Confirmed
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-5">
                <button
                  onClick={() => handleDelete(appt.id)}
                  className="bg-[#E21212] text-[#FFFFFF] font-semibold rounded-md px-5 py-2 hover:bg-red-700 cursor-pointer transition-all duration-200"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className=" mt-8">
        <NavLink to="/" className="text-green-600 hover:underline">
          ← Back to Home
        </NavLink>
      </div>
    </div>
  );
};

export default Appointements;
