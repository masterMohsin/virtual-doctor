import React, { useEffect, useState } from "react";
import API from "../../api/api";
import RescheduleModal from "../../components/RescheduleModel";


const PatientAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cancelingId, setCancelingId] = useState(null);
  const [rescheduleAppt, setRescheduleAppt] = useState(null);

  
    const fetchAppointments = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || user.role !== "patient") {
          setError("❌ Only patients can view appointments.");
          setLoading(false);
          return;
        }

        const response = await API.get(`/appointments/patient/${user.id}`);
        setAppointments(response?.data?.appointment || []);
      } catch (err) {
        console.error(err);
        setError("❌ Failed to load appointments.");
      } finally {
        setLoading(false);
      }

      const interval = setInterval(fetchAppointments, 30000);
    return () => clearInterval(interval);
    };

    useEffect(() => {
      fetchAppointments();
    },[])

    

    // Polling every 30 seconds to get live status updates
    

  // TTL countdown in minutes
  const getTTLMinutes = (expiresAt) => {
    if (!expiresAt) return null;
    const diffMs = new Date(expiresAt) - new Date();
    return diffMs > 0 ? Math.ceil(diffMs / 60000) : 0;
  };

  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?")) return;

    try {
      setCancelingId(id);
      await API.delete(`/appointments/${id}/cancel`);
      setAppointments((prev) =>
        prev.map((appt) =>
          appt._id === id ? { ...appt, status: "cancelled" } : appt
        )
      );
    } catch (err) {
      console.error(err);
      alert("❌ Failed to cancel appointment. Please try again.");
    } finally {
      setCancelingId(null);
    }
  };

  const handleReschedule = async (id) => {
    const newStart = prompt("Enter new start time (YYYY-MM-DD HH:mm):");
    const newEnd = prompt("Enter new end time (YYYY-MM-DD HH:mm):");
    if (!newStart || !newEnd) return;

    try {
      const response = await API.patch(`/appointments/${id}/reschedule`, {
        startTime: new Date(newStart),
        endTime: new Date(newEnd)
      });
      setAppointments((prev) =>
        prev.map((appt) => (appt._id === id ? response.data.appointment : appt))
      );
    } catch (err) {
      console.error(err);
      alert("❌ Failed to reschedule appointment.");
    }
  };

  if (loading) return <p className="text-center mt-10">⏳ Loading appointments...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">📅 My Appointments</h2>

      {appointments.length === 0 ? (
        <p className="text-gray-500">No appointments booked yet.</p>
      ) : (
        <div className="space-y-4">
          {appointments.map((appt) => {
            const ttl = getTTLMinutes(appt.expiresAt);
            return (
              <div key={appt._id} className="p-4  rounded-2xl shadow-lg bg-white flex justify-between items-center">
                <div className="flex items-center gap-4">
                  {/* Doctor Profile Image */}
                  <img
                    src={appt.doctor?.profileImage || "/default-profile.png"}
                    alt={appt.doctor?.fullName || "Doctor"}
                    className="w-20 h-20 rounded-full object-cover "
                  />

                  <div>
                    <h3 className="font-semibold text-lg text-blue-600">
                      {appt.doctor?.fullName || "Doctor"}
                    </h3>
                    <p>Start: {new Date(appt.startTime).toLocaleString()}</p>
                    <p>End: {new Date(appt.endTime).toLocaleString()}</p>
                    <p className="text-gray-600">Reason: {appt.reason}</p>
                    <p className="text-gray-600">Type: {appt.locationType}</p>

                    {/* TTL countdown */}
                    {appt.status === "pending" && ttl > 0 && (
                      <p className="text-yellow-600">
                        ⏳ Pending — Expires in {ttl} min
                      </p>
                    )}
                    {ttl === 0 && appt.status === "pending" && (
                      <p className="text-red-600">❌ Appointment expired</p>
                    )}

                    {/* Video meeting link */}
                    {appt.locationType === "video" && appt.meetUrl && (
                      <a
                        href={appt.meetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        Join Video Meeting
                      </a>
                    )}
                  </div>
                </div>

                <div className="flex flex-col items-end space-y-2">
                  <span className={`px-3 py-1 rounded text-sm ${
                    appt.status === "confirmed"
                      ? "bg-green-100 text-green-600"
                      : appt.status === "pending"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-red-100 text-red-600"
                  }`}>
                    {appt.status}
                  </span>

                  {appt.status !== "cancelled" && (
                    <>
                      <button
                        onClick={() => handleCancel(appt._id)}
                        disabled={cancelingId === appt._id}
                        className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
                      >
                        {cancelingId === appt._id ? "Canceling..." : "Cancel"}
                      </button>

                      <button
  onClick={() => setRescheduleAppt(appt)}
  className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600"
>
  Reschedule
</button>

{rescheduleAppt && (
  <RescheduleModal
    appointment={rescheduleAppt}
    onClose={() => setRescheduleAppt(null)}
    onRescheduled={fetchAppointments} // refresh appointments
  />
)}
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PatientAppointments;
