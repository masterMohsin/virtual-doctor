import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const PopularDoctorProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // ✅ Safely get and parse localStorage data
  const doctors = JSON.parse(localStorage.getItem("popularDoctors") || "[]");

  // ✅ Find the doctor by ID
  const doctor = doctors.find((doc) => String(doc.id) === String(id));

  // ✅ Handle case if doctor not found
  if (!doctor) {
    return (
      <div className="p-6 text-center text-red-500 font-semibold">
        Doctor not found.
      </div>
    );
  }

  const handleBookNow = () => {
    navigate(`/popular-doctors/${id}/select-time`);
  };

  return (
    <div className="max-w-[96%] mx-auto py-2 bg-white rounded-lg shadow-lg font-sans min-h-screen">
      {/* Banner */}
      <div
        className="relative h-40 bg-cover bg-center rounded-lg"
        style={{
          backgroundImage: "url('/imgs/banner.jpg')",
        }}
      >
        {/* Doctor Image */}
        <div className="absolute left-1/2 transform -translate-x-1/2 top-16">
          <img
            src={doctor.image || "/imgs/default-doctor.jpg"}
            alt={doctor.name}
            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
          />
        </div>
      </div>

      {/* Doctor Info */}
      <div className="mt-10 text-center px-4">
        <h2 className="text-2xl font-semibold">{doctor.name}</h2>
        <p className="text-gray-600">{doctor.specialty}</p>
        <p className="text-gray-600">{doctor.qualification || "MBBS, FCPS"}</p>
        <p className="text-gray-600">Experience: {doctor.experience || "10+ Years"}</p>
        <div className="mt-2 text-yellow-500 text-lg font-medium">
          ⭐ {doctor.rating || "4.8"} ({doctor.views || 0} reviews)
        </div>
      </div>

      {/* Availability Section */}
      <div className="mt-8 px-6">
        <h3 className="text-[#0EBE7F] text-xl font-semibold mb-3">Availability</h3>
        <ul className="space-y-2 text-gray-700">
          <li><strong>Hospital:</strong> {doctor.hospital || "Heart Care Clinic, Lahore"}</li>
          <li><strong>Days:</strong> {doctor.days || "Mon - Sat"}</li>
          <li><strong>Time:</strong> {doctor.time || "9:00 AM – 2:00 PM"}</li>
          <li><strong>Mode:</strong> {doctor.mode || "In-person & Video Consultation"}</li>
          <li><strong>Fee:</strong> {doctor.fee || "Rs. 1500"}</li>
        </ul>
      </div>

      {/* About Section */}
      <div className="mt-8 px-6">
        <h3 className="text-[#0EBE7F] text-xl font-semibold mb-3">About</h3>
        <p className="text-gray-700">
          {doctor.about || "This doctor is known for detailed consultations and accurate diagnosis."}
        </p>
      </div>

      {/* Services Section */}
      <div className="mt-8 px-6">
        <h3 className="text-[#0EBE7F] text-xl font-semibold mb-3">Specialties & Services</h3>
        <ul className="space-y-2 text-gray-700 list-disc pl-5">
          {(doctor.services || [
            "High Blood Pressure Treatment",
            "ECG and Heart Monitoring",
            "Cholesterol Management",
          ]).map((service, idx) => (
            <li key={idx}>{service}</li>
          ))}
        </ul>
      </div>

      {/* Book Button */}
      <div className="mt-6 px-6 pb- text-center">
        <button
          onClick={handleBookNow}
          className="bg-[#0EBE7F] hover:bg-[#0aaa70] text-white px-6 py-3 rounded-lg text-lg font-medium transition duration-200"
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
};

export default PopularDoctorProfile;
