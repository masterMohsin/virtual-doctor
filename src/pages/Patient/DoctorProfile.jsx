import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const LOCAL_STORAGE_KEY = "findDoctorsList";

const DoctorProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const doctorName = id.replace(/-/g, " ");
  
  
  // Get doctors list from localStorage
  const doctors = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]");
  console.log(doctors[0].name);
  

  // Find the doctor by ID (convert id to string for comparison)
  const doctor = doctors.find(doc => String(doc.id) === String(id));
  console.log(doctor);
  

  const handleBookNow = () => {
    navigate(-1);
  };

  // if (!doctor) {
  //   return (
  //     <div className="p-6 text-center text-red-500">
  //       Doctor not found.
  //     </div>
  //   );
  // }

  return (
    <div className="max-w-[96%] mx-auto py-2 min-h-screen bg-white rounded-lg shadow-lg overflow-hidden font-sans">
      {/* Banner with background image */}
      <div
        className="relative h-40 bg-cover bg-center rounded-lg"
        style={{
          backgroundImage: "url('/imgs/banner.jpg')",
        }}
      >
        {/* Doctor Image - overlapping */}
        <div className="absolute left-1/2 transform -translate-x-1/2 top-16">
          <img
            src={doctors.image || doctors.img || "/imgs/azeem.jpg"}
            alt={doctors.name}
            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
          />
        </div>
      </div>

      {/* Doctor Info */}
      <div className="mt-10 text-center px-4">
        <h2 className="text-2xl font-semibold text-">{doctorName || doctors.name}</h2>
        <p className="text-gray-600">{doctors.specialty}</p>
        <p className="text-gray-600">{doctors.qualification || "MBBS, FCPS (Cardiology)"}</p>
        <p className="text-gray-600">Experience: {doctors.experience || "10+ Years"}</p>
        <div className="mt-2 text-yellow-500">⭐ {doctors.rating || "4.8"} (230 reviews)</div>
      </div>

      {/* Availability Section */}
      <div className="mt-8 px-6">
        <h3 className="text-[#0EBE7F] text-xl font-semibold mb-3">Availability</h3>
        <ul className="space-y-2 text-gray-700">
          <li><strong>Hospital:</strong> { "Heart Care Clinic, Lahore"}</li>
          <li><strong>Days:</strong> {"Mon - Sat"}</li>
          <li><strong>Time:</strong> { "9:00 AM – 2:00 PM"}</li>
          <li><strong>Mode:</strong> { "In-person & Video Consultation"}</li>
          <li><strong>Fee:</strong> { "Rs. 1500"}</li>
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
