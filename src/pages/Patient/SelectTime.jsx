import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import SuccessModal from "../../components/SuccessModal";

const LOCAL_STORAGE_KEY = "findDoctorsList";

const SelectTime = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);

  const doctors = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]");
  const doctor = doctors.find((doc) => String(doc.id) === String(id));

  if (!doctor) {
    return <div className="p-6 text-center text-red-500">Doctor not found.</div>;
  }

  const [selectedSlot, setSelectedSlot] = useState("2:00 PM");
  const [customDate, setCustomDate] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [toast, setToast] = useState("");
  const [dates, setDates] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);

  const slots = {
    afternoon: ["1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM"],
    evening: ["5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM"],
  };

  const allSlots = [...slots.afternoon, ...slots.evening];
  const existingAppointments = JSON.parse(localStorage.getItem("appointments")) || [];

  const getAvailableSlotsCount = (dateStr) => {
    const booked = existingAppointments.filter((appt) => appt.date === dateStr && appt.doctor === doctor.name);
    return allSlots.length - booked.length;
  };

  const getUpcomingWeekdays = (count = 3) => {
  const days = [];
  let date = new Date();

  while (days.length < count) {
    const day = date.getDay();
    const dateStr = date.toDateString();

    if (day !== 0 && day !== 6) {
      const isToday = new Date().toDateString() === dateStr;

      days.push({
        id: date.getTime(),
        item: dateStr,
        slot: isToday ? "No slots available" : 
              getAvailableSlotsCount(dateStr) > 0
              ? `${getAvailableSlotsCount(dateStr)} slots available`
              : "No slots available",
      });
    }

    date.setDate(date.getDate() + 1);
  }

  return days;
};


  useEffect(() => {
    setDates(getUpcomingWeekdays());
  }, []);

  useEffect(() => {
    if (selectedDate?.item) {
      const booked = existingAppointments
        .filter((appt) => appt.doctor === doctor.name && appt.date === selectedDate.item)
        .map((appt) => appt.slot);
      setBookedSlots(booked);
    }
  }, [selectedDate]);

  const today = new Date().toISOString().split("T")[0];

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
    const availableCount = getAvailableSlotsCount(formatted);

    const newCustom = {
      id: 99,
      item: formatted,
      slot: availableCount > 0 ? `${availableCount} slots available` : "No slots available",
    };

    setCustomDate(newCustom);
    setSelectedDate(newCustom);
    setToast("");
  };

  const handleBookNow = () => {
    if (!selectedDate || selectedDate.slot === "No slots available") {
      setToast("❌ Please select a valid date.");
      return;
    }

    const appointment = {
      id: Date.now(),
      image: doctor.image,
      doctor: doctor.name,
      date: selectedDate.item,
      slot: selectedSlot,
    };

    const updatedAppointments = [appointment, ...existingAppointments];
    localStorage.setItem("appointments", JSON.stringify(updatedAppointments));

    setToast("");
    setShowSuccess(true);
  };

  const handleVerify = (doctorName) => {
    const formattedName = doctorName.replace(/\./g, "").replace(/\s+/g, "-");
    navigate(`/patient/doctor-profile/${formattedName}`);
  };

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
            <h2 className="text-[#333333] text-3xl font-semibold mb-1">{doctor.name}</h2>
            <p className="text-[#677294] mb-2">{doctor.specialty}</p>
            <div className="flex items-center text-xl text-yellow-500">
              {Array(4).fill().map((_, i) => <FaStar key={i} />)}
              <FaStar className="text-gray-300" />
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            onClick={() => handleVerify(doctor.name)}
            className="bg-[#0EBE7F] text-white px-4 py-2 font-semibold rounded-md cursor-pointer"
          >
            View Profile
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="flex justify-center gap-5 bg-[#0EBE7F] rounded-md max-w-sm mx-auto p-3 mt-10 text-center">
        {["300+ Patients", "15+ Year Exp", "200+ Reviews"].map((item, idx) => (
          <div key={idx} className="bg-white px-3 py-2 rounded-xl shadow text-xl text-[#0EBE7F] font-semibold">
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
              selectedDate?.id === currItem.id ? "bg-[#0EBE7F] text-white" : "bg-white"
            } ${
              currItem.slot === "No slots available" ? "opacity-50 cursor-not-allowed" : ""
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
        {/* Afternoon */}
        <div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            Afternoon ({slots.afternoon.length} slots)
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4 text-xl">
            {slots.afternoon.map((slot, idx) => {
              const isBooked = bookedSlots.includes(slot);
              return (
                <button
                  key={idx}
                  disabled={isBooked}
                  className={`px-3 py-2 rounded-md font-semibold transition-all duration-200 ${
                    isBooked
                      ? "bg-red-400 text-white cursor-not-allowed"
                      : selectedSlot === slot
                      ? "bg-[#0EBE7F] text-white"
                      : "bg-green-100 text-[#0EBE7F] hover:bg-[#0EBE7F] hover:text-white"
                  }`}
                  onClick={() => !isBooked && setSelectedSlot(slot)}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </div>

        {/* Evening */}
        <div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            Evening ({slots.evening.length} slots)
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4 text-xl font-semibold">
            {slots.evening.map((slot, idx) => {
              const isBooked = bookedSlots.includes(slot);
              return (
                <button
                  key={idx}
                  disabled={isBooked}
                  className={`px-3 py-2 rounded-md transition-all duration-200 ${
                    isBooked
                      ? "bg-red-400 text-white cursor-not-allowed"
                      : selectedSlot === slot
                      ? "bg-[#0EBE7F] text-white"
                      : "bg-green-100 text-[#0EBE7F] hover:bg-[#0EBE7F] hover:text-white"
                  }`}
                  onClick={() => !isBooked && setSelectedSlot(slot)}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Book Button */}
      <div className="text-center mt-10 flex justify-center items-center">
        <button
          onClick={handleBookNow}
          className="bg-[#0EBE7F] text-white px-6 py-3 text-xl font-semibold rounded-full hover:bg-[#83ecac] transition"
        >
          Book now
        </button>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <SuccessModal
          doctor={doctor}
          date={selectedDate?.item}
          slot={selectedSlot}
          onClose={() => setShowSuccess(false)}
          onDone={() => {
            setShowSuccess(false);
            navigate("/patient/appointments");
          }}
        />
      )}

      {/* Toast */}
      {toast && <p className="text-center text-red-500 mt-4">{toast}</p>}
    </div>
  );
};

export default SelectTime;
