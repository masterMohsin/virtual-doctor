import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../api/api.js";

const DoctorProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [doctorError, setDoctorError] = useState(null);

  useEffect(() => {
    // Try localStorage first
    const doctors = JSON.parse(localStorage.getItem("popularDoctors") || "[]");
    const found = doctors.find(doc => String(doc.id) === String(id) || String(doc._id) === String(id));
    if (found) {
      setDoctor(found);
      setDoctorError(null);
    } else {
      // Fallback: fetch from backend
      API.get(`/get-doctor/${id}`)
        .then(res => {
          if (res.data.success && res.data.doctor) {
            setDoctor(res.data.doctor);
            setDoctorError(null);
          } else {
            setDoctorError(res.data.error || "Doctor not found.");
          }
        })
        .catch(() => setDoctorError("Doctor not found."));
    }
  }, [id]);

  const handleBookNow = () => {
    navigate(`/patient/select-time/${id}`);
  };

  // Helper to get today's consultation hours
  const getTodayHours = () => {
    if (!doctor || !doctor.consultationHours || !Array.isArray(doctor.consultationHours)) return null;
    const todayKey = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][new Date().getDay()];
    return doctor.consultationHours.find(h => h.day === todayKey) || doctor.consultationHours[0] || null;
  };
  const todayHours = getTodayHours();

  if (doctorError) {
    return <div className="p-6 text-center text-red-500">{doctorError}</div>;
  }
  if (!doctor) {
    return <div className="p-6 text-center text-gray-500">Loading doctor...</div>;
  }

  return (
    <div className="max-w-[96%] mx-auto py-2 min-h-screen bg-white rounded-lg shadow-lg overflow-hidden font-sans">
      {/* Banner with background image */}
      <div
        className="relative h-40 bg-cover bg-center rounded-lg"
        style={{ backgroundImage: "url('/imgs/banner.jpg')" }}
      >
        {/* Doctor Image - overlapping */}
        <div className="absolute left-1/2 transform -translate-x-1/2 top-16">
          <img
            src={doctor.profileImage || "/imgs/azeem.jpg"}
            alt={doctor.fullName || doctor.name || "Doctor"}
            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
          />
        </div>
      </div>

      {/* Doctor Info */}
      <div className="mt-10 text-center px-4">
        <h2 className="text-2xl font-semibold">{doctor.fullName || doctor.name || "Doctor"}</h2>
        <p className="text-gray-600">{doctor.specialization || "Specialist"}</p>
        <p className="text-gray-600">{doctor.qualification || "MBBS, FCPS (Cardiology)"}</p>
        <p className="text-gray-600">Experience: {doctor.yearsOfExperience ? doctor.yearsOfExperience : "10+ Years"}</p>
        <div className="mt-2 text-yellow-500">⭐ {doctor.rating || "4.8"} (230 reviews)</div>
      </div>

      {/* Availability Section */}
      <div className="mt-8 px-6">
        <h3 className="text-[#0EBE7F] text-xl font-semibold mb-3">Availability</h3>
        <ul className="space-y-2 text-gray-700">
          <li><strong>Hospital:</strong> {doctor.affiliation || "Heart Care Clinic, Lahore"}</li>
          {Array.isArray(doctor.consultationHours) && doctor.consultationHours.length > 0 ? (
            doctor.consultationHours.map((h, idx) => (
              <li key={idx}>
                <strong>{h.day}:</strong> {h.isClosed ? "Closed" : `${h.start} - ${h.end}`}
              </li>
            ))
          ) : (
            <li><strong>Days:</strong> Mon - Sat</li>
          )}
          <li><strong>Mode:</strong> In-person & Video Consultation</li>
          <li><strong>Fee:</strong> Rs. {doctor.fee || 1500}</li>
        </ul>
      </div>

      {/* About Section */}
      <div className="mt-8 px-6">
        <h3 className="text-[#0EBE7F] text-xl font-semibold mb-3">About</h3>
        <p className="text-gray-700">
          {
            "This doctor is known for detailed consultations and accurate diagnosis."}
        </p>
      </div>

      {/* Services Section */}
      <div className="mt-8 px-6">
        <h3 className="text-[#0EBE7F] text-xl font-semibold mb-3">Specialties & Services</h3>
        <ul className="space-y-2 text-gray-700 list-disc pl-5">
          <li>High Blood Pressure Treatment</li>
          <li>ECG and Heart Monitoring</li>
          <li>Cholesterol Management</li>
        </ul>
      </div>

      {/* Book Button */}
      <div className="mt-5 px-6 pb-10 text-center">
        <button
          onClick={handleBookNow}
          className="inline-block bg-[#0EBE7F] hover:bg-[#0aaa70] text-white px-6 py-3 rounded-lg text-lg font-medium transition duration-200"
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
};

export default DoctorProfile;
