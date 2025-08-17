import React from "react";
import { useParams } from "react-router-dom";

const LOCAL_STORAGE_KEY = "findDoctorsList";

const DoctorTime = () => {
  const { id } = useParams();

  // Get doctors list from localStorage
  const doctors = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]");
  // Find the doctor by ID (convert id to number if needed)
  const doctor = doctors.find(doc => String(doc.id) === String(id));

  if (!doctor) {
    return <div className="p-6 text-center text-red-500">Doctor not found.</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Select Time for {doctor.name}</h2>
      <div className="mb-4">
        <img
          src={doctor.image || "/imgs/azeem.jpg"}
          alt={doctor.name}
          className="w-24 h-24 rounded-full object-cover mx-auto"
        />
        <p className="mt-2 text-gray-700 text-center">{doctor.specialty}</p>
      </div>
      {/* Add your time selection UI here */}
    </div>
  );
};

export default DoctorTime;