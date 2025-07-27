import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

const LOCAL_STORAGE_KEY = "findDoctorsList";

const SelectTime = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Get doctors list from localStorage
  const doctors = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]");

  // Find the doctor by ID (convert id to string for comparison)
  const doctor = doctors.find(doc => String(doc.id) === String(id));

  if (!doctor) {
    return <div className="p-6 text-center text-red-500">Doctor not found.</div>;
  }

  const [selectedSlot, setSelectedSlot] = useState("2:00 PM");
  const [customDate, setCustomDate] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [toast, setToast] = useState("");

  const slots = {
    afternoon: [
      "1:00 PM",
      "1:30 PM",
      "2:00 PM",
      "2:30 PM",
      "3:00 PM",
      "3:30 PM",
      "4:00 PM",
    ],
    evening: ["5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM"],
  };

  const dates = [
    { id: 1, item: "Today, 23 Feb", slot: "No slots available" },
    { id: 2, item: "Tomorrow, 24 Feb", slot: "10 slots available" },
    { id: 3, item: "Thur, 25 Feb", slot: "10 slots available" },
  ];

  const handleCustomDate = (e) => {
    const value = e.target.value;
    if (!value) return;

    const selected = new Date(value);
    const day = selected.getDay();

    if (day === 0 || day === 6) {
      setToast("❌ Weekends are not allowed.");
      return;
    }

    const formatted = selected.toDateString();
    const newCustom = {
      id: 99,
      item: formatted,
      slot: "10 slots available",
    };

    setCustomDate(newCustom);
    setSelectedDate(newCustom);
  };

  const today = new Date().toISOString().split("T")[0];

  const handleBookNow = () => {
    if (selectedDate?.slot === "No slots available" || !selectedDate) {
      setToast("❌ Please select a valid date.");
    } else {
      const appointment = {
        id: Date.now(),
        image: doctor.image,
        doctor: doctor.name,
        date: selectedDate.item,
        slot: selectedSlot,
        
      };

      // Save to localStorage
      const existing = JSON.parse(localStorage.getItem("appointments")) || [];
      localStorage.setItem(
        "appointments",
        JSON.stringify([appointment, ...existing])
      );

      setToast("✅ Appointment booked successfully!");

      // Optionally navigate to success page
      // navigate("/booking-success", { state: appointment });
    }
  };

  const handleVerify = (doctorName) => {
    const formattedName = doctorName.replace(/\./g, "").replace(/\s+/g, "-");
    navigate(`/doctor-profile/${formattedName}`)
  } 

  return (
    <div className="max-w-full min-h-screen mx-auto p-6 bg-white shadow-2xl rounded-3xl">
      {/* Header */}
      <div className="w-full md:w-[700px] min-h-[180px] p-5 mx-auto rounded-md shadow-lg mt-10">
        <div className="flex flex-col md:flex-row items-center gap-2">
          <img
            src={doctor.image || "/imgs/azeem.jpg"}
            alt={doctor.name}
            className="w-28 h-28 rounded-xl object-cover"
          />
          <div>
            <h2 className="text-[#333333] text-3xl font-semibold mb-1">
              {doctor.name}
            </h2>
            <p className="text-[#677294] mb-2">{doctor.specialty}</p>
            
            <div className="flex items-center text-xl text-yellow-500">
              {Array(4)
                .fill()
                .map((_, i) => (
                  <FaStar key={i} />
                ))}
              <FaStar className="text-gray-300" />
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <button onClick={() => handleVerify(doctor.name)} className="bg-[#0EBE7F] text-white px-4 py-2 font-semibold rounded-md cursor-pointer">
            View Profile
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="flex  justify-center gap-5 bg-[#0EBE7F] rounded-md max-w-sm mx-auto p-3 mt-10 text-center">
        {["300+ Patients", "15+ Year Exp", "200+ Reviews"].map((item, idx) => (
          <div
            key={idx}
            className="bg-white px-3 py-2 rounded-xl shadow text-xl text-[#0EBE7F] font-semibold"
          >
            {item}
          </div>
        ))}
      </div>

      {/* Date Selection */}
      <div className="flex justify-center gap-3 flex-wrap text-sm text-center mt-10">
        {[...dates, ...(customDate ? [customDate] : [])].map((currItem) => (
          <div
            key={currItem.id}
            onClick={() => {
              if (currItem.slot !== "No slots available") {
                setSelectedDate(currItem);
              }
            }}
            className={`px-4 py-2 border border-gray-100 rounded-md cursor-pointer ${
              selectedDate?.id === currItem.id
                ? "bg-[#0EBE7F] text-white"
                : "bg-white"
            } ${
              currItem.slot === "No slots available"
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            <h2 className="text-xl font-semibold">{currItem.item}</h2>
            <p>{currItem.slot}</p>
          </div>
        ))}
      </div>

      {/* Custom Date Input */}
      <div className="flex flex-col items-center mt-5">
        <label className="text-gray-600 mb-1">Or choose a custom date:</label>
        <input
          type="date"
          min={today}
          className="border px-4 py-2 rounded-md shadow text-gray-700"
          onChange={handleCustomDate}
        />
      </div>

      {/* Slots */}
      <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20">
        {/* Afternoon Slots */}
        <div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            Afternoon ({slots.afternoon.length} slots)
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4 text-xl">
            {slots.afternoon.map((slot, idx) => (
              <button
                key={idx}
                className={`px-3 py-2 rounded-md  cursor-pointer transition-all duration-200 ${
                  selectedSlot === slot
                    ? "bg-[#0EBE7F] text-white border-green-600"
                    : "bg-green-100 text-[#0EBE7F] hover:bg-[#0EBE7F] hover:text-white"
                }`}
                onClick={() => setSelectedSlot(slot)}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        {/* Evening Slots */}
        <div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            Evening ({slots.evening.length} slots)
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4 text-xl font-semibold">
            {slots.evening.map((slot, idx) => (
              <button
                key={idx}
                className={`px-3 py-2 rounded-md  cursor-pointer transition-all duration-200 ${
                  selectedSlot === slot
                    ? "bg-[#0EBE7F] text-white border-green-600"
                    : "bg-green-100 text-[#0EBE7F] hover:bg-[#0EBE7F] hover:text-white"
                }`}
                onClick={() => setSelectedSlot(slot)}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Book Now */}
      <div className="text-center mt-10 flex justify-center items-center">
        <button
          onClick={handleBookNow}
          className="bg-[#0EBE7F] text-white px-6 py-3 text-xl cursor-pointer font-semibold rounded-full hover:bg-[#83ecac] transition"
        >
          Book now
        </button>
      </div>

      {/* Toast Message */}
      {toast && (
        <div className="mt-6 text-center text-white bg-black/80 px-4 py-2 rounded-md w-fit mx-auto transition-all duration-300">
          {toast}
        </div>
      )}
    </div>
  );
};

export default SelectTime;
