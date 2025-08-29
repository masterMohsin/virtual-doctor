import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../api/api.js";

const PopularDoctorProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        setLoading(true);
        const res = await API.get(`/users/get-doctor/${id}`);
        console.log(res.data);
        
        
        if (res.data.success) {
          setDoctor(res.data.doctor);
        } else {
          setError("Failed to fetch doctor data");
        }
      } catch (error) {
        console.error("Error fetching doctor:", error);
        setError("Error loading doctor profile");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDoctor();
    }
  }, [id]);

  const handleBookNow = (id) => {
    navigate(`/patient/select-time/${id}`);
  };

  if (loading) {
    return (
      <div className="p-6 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading doctor profile...</p>
      </div>
    );
  }

  if (error || !doctor) {
    return (
      <div className="p-6 text-center text-red-500 font-semibold">
        {error || "Doctor not found."}
      </div>
    );
  }

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
            src={doctor.profileImage || "/imgs/default-doctor.jpg"}
            alt={doctor.fullName}
            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
          />
        </div>
      </div>

      {/* Doctor Info */}
      <div className="mt-10 text-center px-4">
        <h2 className="text-2xl font-semibold">{doctor.fullName}</h2>
        <p className="text-gray-600">{doctor.specialization}</p>
        <p className="text-gray-600">{doctor?.qualification || "MBBS, FCPS"}</p>
        <p className="text-gray-600">Experience: {doctor.yearsOfExperience || "10+"} Years</p>
        <div className="mt-2 text-yellow-500 text-lg font-medium">
          ⭐ 4.5 (150+ reviews)
        </div>
      </div>

      {/* Availability Section */}
      <div className="mt-8 px-6">
        <h3 className="text-[#0EBE7F] text-xl font-semibold mb-3">Availability</h3>
        <ul className="space-y-2 text-gray-700">
          <li><strong>Hospital:</strong> {doctor.affiliation || "Heart Care Clinic, Lahore"}</li>
          <li><strong>Days:</strong> Mon - Sat</li>
          <li><strong>Time:</strong> {doctor.consultationHours?.start || "09:00 AM"} - {doctor.consultationHours?.end || "05:00 PM"}</li>
          <li><strong>Mode:</strong> In-person & Video Consultation</li>
          <li><strong>Fee:</strong> Rs. 1500</li>
        </ul>
      </div>

      {/* About Section */}
      <div className="mt-8 px-6">
        <h3 className="text-[#0EBE7F] text-xl font-semibold mb-3">About</h3>
        <p className="text-gray-700">
          Dr. {doctor.fullName} is a highly qualified {doctor.specialization} specialist with {doctor.yearsOfExperience} years of experience. 
          Known for detailed consultations and accurate diagnosis, providing comprehensive care to patients.
        </p>
      </div>

      {/* Services Section */}
      <div className="mt-8 px-6">
        <h3 className="text-[#0EBE7F] text-xl font-semibold mb-3">Specialties & Services</h3>
        <ul className="space-y-2 text-gray-700 list-disc pl-5">
          <li>{doctor.specialization} Treatment</li>
          <li>General Consultation</li>
          <li>Health Monitoring</li>
          <li>Preventive Care</li>
        </ul>
      </div>

      {/* Book Button */}
      <div className="mt-6 px-6 pb-6 text-center">
        <button
          onClick={() => handleBookNow(doctor.id)}
          className="bg-[#0EBE7F] hover:bg-[#0aaa70] text-white px-6 py-3 rounded-lg text-lg font-medium transition duration-200"
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
};

export default PopularDoctorProfile;
