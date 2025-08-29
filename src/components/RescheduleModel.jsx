import React, { useState, useEffect } from "react";
import API from "../api/api";

// Helper to format slot for backend
const formatSlotForBackend = (date, slot) => {
  const [startTime, endTime] = slot.split("-");
  if (!startTime || !endTime) throw new Error("Invalid slot format");

  const start = new Date(`${date}T${startTime}`);
  const end = new Date(`${date}T${endTime}`);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    throw new Error("Invalid date or slot");
  }

  return { startTime: start.toISOString(), endTime: end.toISOString() };
};

const RescheduleModal = ({ appointment, onClose, onRescheduled }) => {
  const [date, setDate] = useState("");
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch available slots when date changes
  useEffect(() => {
    if (!date) return;

    const fetchSlots = async () => {
      try {
        const response = await API.get(
          `/appointments/doctor/${appointment.doctor._id}/slots?date=${date}`
        );
        setSlots(response.data.slots || []);
      } catch (err) {
        console.error("Error fetching slots:", err);
        setSlots([]);
      }
    };

    fetchSlots();
  }, [date, appointment.doctor._id]);

  const handleReschedule = async () => {
    if (!date || !selectedSlot) return alert("Select date and slot first!");
    setLoading(true);
    try {
      const { startTime, endTime } = formatSlotForBackend(date, selectedSlot);

      const res = await API.patch(`/appointments/${appointment._id}/reschedule`, {
        startTime,
        endTime,
      });

      console.log("Reschedule response:", res.data);
      onRescheduled(); // update parent state
      onClose();
    } catch (err) {
      console.error("Reschedule error:", err);
      alert(
        err.response?.data?.message ||
          "Failed to reschedule appointment. Check console for details."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-lg font-bold mb-4">Reschedule Appointment</h2>

        <label className="block mb-2">Select Date:</label>
        <input
          type="date"
          className="border p-2 w-full mb-4 rounded"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        {slots.length > 0 && (
          <>
            <label className="block mb-2">Available Slots:</label>
            <select
              className="border p-2 w-full mb-4 rounded"
              value={selectedSlot}
              onChange={(e) => setSelectedSlot(e.target.value)}
            >
              <option value="">-- Select Slot --</option>
              {slots.map((slot, idx) => (
                <option key={idx} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </>
        )}

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleReschedule}
            disabled={loading}
            className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? "Rescheduling..." : "Reschedule"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RescheduleModal;
