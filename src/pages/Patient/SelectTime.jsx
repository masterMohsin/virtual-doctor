// src/pages/patient/SelectTime.jsx
import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import SuccessModal from "../../components/SuccessModal";
import API from "../../api/api.js";
import { useAuth } from "../../context/AuthContext";

const SelectTime = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth(); // ✅ Logged-in user from context
  const patient = JSON.parse(localStorage.getItem("user"));
  console.log("Logged-in patient:", patient);
  
  const token = user?.token || localStorage.getItem("token");

  const [doctors, setDoctors] = useState(
    JSON.parse(localStorage.getItem("popularDoctors") || "[]")
  );
  const doctor = doctors.find(
    (doc) => String(doc._id || doc.id) === String(id)
  );
  console.log("Selected doctor:", doctor);
  

  const [selectedSlot, setSelectedSlot] = useState(null);
  const [customDate, setCustomDate] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [toast, setToast] = useState("");
  const [dates, setDates] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [reason, setReason] = useState("");
  const [locationType, setLocationType] = useState("video");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!doctor) {
    return (
      <div className="p-6 text-center text-red-500">
        Doctor not found.
      </div>
    );
  }

  const getUpcomingWeekdays = (count = 7) => {
    const days = [];
    let date = new Date();
    while (days.length < count) {
      const day = date.getDay();
      const dateStr = date.toISOString().split("T")[0];
      if (day !== 0 && day !== 6) {
        const isToday = new Date().toISOString().split("T")[0] === dateStr;
        days.push({
          id: date.getTime(),
          item: dateStr,
          display: date.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          }),
          isToday,
        });
      }
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  useEffect(() => {
    setDates(getUpcomingWeekdays());
  }, []);

  const fetchAvailableSlots = async (date) => {
    try {
      const response = await API.get(
        `/appointments/doctor/${doctor._id || doctor.id}/slots?date=${date}`
      );
      setAvailableSlots(response.data.slots || []);
    } catch (error) {
      console.error("Error fetching slots:", error);
      setAvailableSlots([]);
    }
  };

  useEffect(() => {
    if (selectedDate) fetchAvailableSlots(selectedDate);
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
    const newCustom = {
      id: 99,
      item: value,
      display: selected.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      }),
      isToday: false,
    };
    setCustomDate(newCustom);
    setSelectedDate(value);
    setToast("");
  };

  const formatTime = (dateTime) => {
    const date = new Date(dateTime);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleBookNow = async () => {
    if (!user && !patient) {
      alert("Please login first.");
      return;
    }

    if (!selectedSlot) {
      alert("Please select a time slot.");
      return;
    }

    const selectedStart = selectedSlot.startTime;
    const selectedEnd = selectedSlot.endTime;

    const doctorId = doctor._id || doctor.id;
    const patientId = user?._id || patient?.id;

    if (!doctorId || !patientId) {
      console.error("Missing doctor or patient ID", { doctorId, patientId });
      alert("Something went wrong: missing doctor/patient info.");
      return;
    }

    const appointmentData = {
      doctor: doctorId,
      patient: patientId,
      startTime: selectedStart,
      endTime: selectedEnd,
      reason: reason || "",
      locationType,
    };

    try {
      setLoading(true);
      const response = await API.post("/appointments/book", appointmentData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      

      setLoading(false);
      setShowSuccess(true);
      console.log("Booked appointment:", response.data);
      
    } catch (error) {
      setLoading(false);
      console.error("Error booking appointment:", error);
      alert(
        error.response?.data?.message ||
          "Failed to book appointment. Please try again."
      );
    }
  };

  const handleVerify = (id) => {
    navigate(`/patient/doctor-profile/${id}`);
  };

  return (
    <div className="max-w-full min-h-screen mx-auto p-6 bg-white shadow-2xl rounded-3xl">
      {/* Header */}
      <div className="w-full md:w-[700px] min-h-[180px] p-5 mx-auto rounded-md shadow-lg mt-10">
        <div className="flex flex-col md:flex-row items-center gap-2">
          <img
            src={doctor.profileImage || "/imgs/azeem.jpg"}
            alt={doctor.fullName || doctor.name}
            className="w-28 h-28 rounded-xl object-cover"
          />
          <div>
            <h2 className="text-[#333333] text-3xl font-semibold mb-1">
              {doctor.fullName}
            </h2>
            <p className="text-[#677294] mb-2">{doctor.specialization}</p>
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
          <button
            onClick={() => handleVerify(doctor._id || doctor.id)}
            className="bg-[#0EBE7F] text-white px-4 py-2 font-semibold rounded-md cursor-pointer"
          >
            View Profile
          </button>
        </div>
      </div>

      {/* Dates */}
      <div className="flex justify-center gap-3 flex-wrap text-sm text-center mt-10">
        {[...dates, ...(customDate ? [customDate] : [])].map((currItem) => (
          <div
            key={currItem.id}
            onClick={() => setSelectedDate(currItem.item)}
            className={`px-4 py-2 border border-gray-100 rounded-md cursor-pointer ${
              selectedDate === currItem.item
                ? "bg-[#0EBE7F] text-white"
                : "bg-white"
            }`}
          >
            <h2 className="text-xl font-semibold">{currItem.display}</h2>
            {currItem.isToday && <p className="text-xs">Today</p>}
          </div>
        ))}
      </div>

      {/* Custom Date */}
      <div className="flex flex-col items-center mt-5">
        <label className="text-gray-600 mb-1">Or choose a custom date:</label>
        <input
          type="date"
          min={today}
          className="border px-4 py-2 rounded-md shadow text-gray-700"
          onChange={handleCustomDate}
        />
      </div>

      {/* Reason & Type */}
      {selectedDate && (
        <div className="mt-8 max-w-md mx-auto">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Reason for Visit
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Describe your symptoms or reason for the appointment..."
              rows="3"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Appointment Type
            </label>
            <select
              value={locationType}
              onChange={(e) => setLocationType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="video">Video Consultation</option>
              <option value="in_person">In-Person Visit</option>
            </select>
          </div>
        </div>
      )}

      {/* Slots */}
      {selectedDate && availableSlots.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-600 mb-4 text-center">
            Available Time Slots for{" "}
            {new Date(selectedDate).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-w-2xl mx-auto">
            {availableSlots.map((slot, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedSlot(slot)}
                className={`px-4 py-3 rounded-md font-semibold transition-all duration-200 ${
                  selectedSlot?.startTime === slot.startTime
                    ? "bg-[#0EBE7F] text-white"
                    : "bg-green-100 text-[#0EBE7F] hover:bg-[#0EBE7F] hover:text-white"
                }`}
              >
                {formatTime(slot.startTime)}
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedDate && availableSlots.length === 0 && (
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-lg">
            No available slots for the selected date.
          </p>
        </div>
      )}

      {/* Book */}
      <div className="text-center mt-10 flex justify-center items-center">
        <button
          onClick={handleBookNow}
          disabled={loading || !selectedDate || !selectedSlot || !reason.trim()}
          className={`px-6 py-3 text-xl font-semibold rounded-full transition ${
            loading || !selectedDate || !selectedSlot || !reason.trim()
              ? "bg-gray-400 text-gray-600 cursor-not-allowed"
              : "bg-[#0EBE7F] text-white hover:bg-[#83ecac]"
          }`}
        >
          {loading ? "Booking..." : "Book Appointment"}
        </button>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <SuccessModal
          doctor={doctor}
          date={selectedDate}
          slot={selectedSlot ? formatTime(selectedSlot.startTime) : ""}
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
