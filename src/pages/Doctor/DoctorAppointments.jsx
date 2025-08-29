import React, { useEffect, useState } from "react";
import API from "../../api/api";
import { format, isToday, isTomorrow } from "date-fns";

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || user.role !== "doctor") {
          setError("❌ Only doctors can view appointments.");
          setLoading(false);
          return;
        }

        const response = await API.get(`/appointments/doctor/${user.id}`);
        setAppointments(response.data.appointment || []);
      } catch (err) {
        console.error(err);
        setError("❌ Failed to load appointments.");
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  const handleConfirm = async (id) => {
    try {
      const res = await API.patch(`/appointments/${id}/confirm`);
      setAppointments((prev) =>
        prev.map((appt) =>
          appt._id === id ? { ...appt, status: "confirmed" } : appt
        )
      );
    } catch (err) {
      console.error(err);
      alert("❌ Could not confirm appointment.");
    }
  };

  const handleCancel = async (id) => {
    try {
      const res = await API.patch(`/appointments/${id}/cancel`);
      setAppointments((prev) =>
        prev.map((appt) =>
          appt._id === id ? { ...appt, status: "cancelled" } : appt
        )
      );
    } catch (err) {
      console.error(err);
      alert("❌ Could not cancel appointment.");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isToday(date)) return "Today";
    if (isTomorrow(date)) return "Tomorrow";
    return format(date, "dd MMM yyyy");
  };

  if (loading) return <p className="text-center mt-10">⏳ Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">👩‍⚕️ My Appointments</h2>

      {appointments.length === 0 ? (
        <p className="text-gray-500">No appointments yet.</p>
      ) : (
        <div className="space-y-4">
          {appointments.map((appt) => (
            <div
              key={appt._id}
              className="p-4 border rounded-lg shadow-sm bg-white flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold text-lg text-blue-600">
                  {appt.patient?.fullName || "Patient"}
                </h3>
                <p className="text-gray-600">📅 Date: {formatDate(appt.startTime)}</p>
                <p className="text-gray-600">
                  ⏰ Time: {format(new Date(appt.startTime), "hh:mm a")} - {format(new Date(appt.endTime), "hh:mm a")}
                </p>
                <p className="text-gray-600">Reason: {appt.reason}</p>
                <p className="text-gray-600">Type: {appt.locationType}</p>
                {appt.meetUrl && (
                  <a
                    href={appt.meetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    Join Meeting
                  </a>
                )}
                {appt.patient?.profileImage && (
                  <img
                    src={appt.patient.profileImage}
                    alt="Patient"
                    className="w-12 h-12 rounded-full mt-2"
                  />
                )}
              </div>

              <div className="flex flex-col items-end space-y-2">
                <span
                  className={`px-3 py-1 rounded text-sm ${
                    appt.status === "confirmed"
                      ? "bg-green-100 text-green-600"
                      : appt.status === "pending"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {appt.status}
                </span>

                {appt.status === "pending" && (
                  <div className="flex space-x-2 mt-2">
                    <button
                      onClick={() => handleConfirm(appt._id)}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => handleCancel(appt._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorAppointments;
