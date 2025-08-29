
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import API from "../../api/api.js";

const Appointements = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('upcoming');

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user?.id) {
        setError('User not authenticated');
        return;
      }
      
      const response = await API.get(`/appointments/patient/${user.id}`);
      setAppointments(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch appointments');
      console.error('Error fetching appointments:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (appointmentId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to cancel this appointment?"
    );
    if (!confirmDelete) return;

    try {
      await API.patch(`/appointments/${appointmentId}/cancel`);
      fetchAppointments(); // Refresh the list
    } catch (err) {
      setError('Failed to cancel appointment');
      console.error('Error cancelling appointment:', err);
    }
  };

  const handleReschedule = async (appointmentId) => {
    // This would typically open a modal or navigate to a reschedule page
    alert('Reschedule functionality would be implemented here');
  };

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return {
      date: date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      time: date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'text-green-600';
      case 'pending': return 'text-yellow-600';
      case 'cancelled': return 'text-red-600';
      case 'completed': return 'text-blue-600';
      case 'rescheduled': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };

  const filterAppointments = (status) => {
    const now = new Date();
    switch (status) {
      case 'upcoming':
        return appointments.filter(appt => 
          new Date(appt.startTime) > now && 
          appt.status !== 'cancelled' && 
          appt.status !== 'completed'
        );
      case 'past':
        return appointments.filter(appt => 
          new Date(appt.endTime) < now || 
          appt.status === 'completed'
        );
      case 'cancelled':
        return appointments.filter(appt => appt.status === 'cancelled');
      default:
        return appointments;
    }
  };

  const renderAppointmentCard = (appointment) => {
    const { date, time } = formatDateTime(appointment.startTime);
    const isPast = new Date(appointment.endTime) < new Date();

  return (
      <div
        key={appointment._id}
        className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="w-20 h-20 bg-blue-100 rounded-lg flex items-center justify-center">
            {appointment.doctor?.profileImageUrl ? (
              <img
                src={appointment.doctor.profileImageUrl}
                alt={appointment.doctor.fullName}
                className="w-full h-full rounded-lg object-cover"
              />
            ) : (
              <span className="text-2xl font-bold text-blue-600">
                {appointment.doctor?.fullName?.charAt(0) || 'D'}
              </span>
            )}
          </div>
          <div className="flex-1">
            <h2 className="font-semibold text-2xl text-gray-800">
              Dr. {appointment.doctor?.fullName || 'Unknown Doctor'}
                  </h2>
            <p className="text-gray-600">{appointment.doctor?.specialization}</p>
                </div>
              </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <h3 className="font-bold text-lg text-gray-700">Date</h3>
            <p className="text-xl font-semibold">{date}</p>
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-700">Time</h3>
            <p className="text-xl font-semibold">{time}</p>
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-700">Mode</h3>
            <p className="text-xl font-semibold capitalize">
              {appointment.locationType?.replace('_', ' ') || 'Video'}
            </p>
                </div>
          <div>
            <h3 className="font-bold text-lg text-gray-700">Status</h3>
            <p className={`text-xl font-semibold ${getStatusColor(appointment.status)}`}>
              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                  </p>
                </div>
              </div>

        {appointment.reason && (
          <div className="mb-4">
            <h3 className="font-bold text-lg text-gray-700 mb-2">Reason</h3>
            <p className="text-gray-800">{appointment.reason}</p>
          </div>
        )}

        {appointment.meetUrl && appointment.locationType === 'video' && appointment.status === 'confirmed' && !isPast && (
          <div className="mb-4">
            <h3 className="font-bold text-lg text-gray-700 mb-2">Meeting Link</h3>
            <a 
              href={appointment.meetUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Join Meeting
            </a>
          </div>
        )}

        <div className="flex justify-end gap-3">
          {appointment.status === 'pending' && !isPast && (
            <>
              <button
                onClick={() => handleCancel(appointment._id)}
                className="bg-red-600 text-white font-semibold rounded-md px-5 py-2 hover:bg-red-700 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handleReschedule(appointment._id)}
                className="bg-yellow-600 text-white font-semibold rounded-md px-5 py-2 hover:bg-yellow-700 transition"
              >
                Reschedule
              </button>
            </>
          )}
          {appointment.status === 'confirmed' && !isPast && (
                <button
              onClick={() => handleCancel(appointment._id)}
              className="bg-red-600 text-white font-semibold rounded-md px-5 py-2 hover:bg-red-700 transition"
                >
                  Cancel
                </button>
          )}
          {appointment.status === 'completed' && (
            <button className="bg-green-600 text-white font-semibold rounded-md px-5 py-2 hover:bg-green-700 transition">
              View Details
                </button>
          )}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="max-w-full p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-full p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  const upcomingAppointments = filterAppointments('upcoming');
  const pastAppointments = filterAppointments('past');
  const cancelledAppointments = filterAppointments('cancelled');

  return (
    <div className="max-w-full p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2 text-green-700">
          Your Appointments
        </h1>
        <p className="text-gray-600">Manage and track your medical appointments</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800">Upcoming</h3>
          <p className="text-2xl font-bold text-green-600">{upcomingAppointments.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800">Completed</h3>
          <p className="text-2xl font-bold text-blue-600">{pastAppointments.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800">Cancelled</h3>
          <p className="text-2xl font-bold text-red-600">{cancelledAppointments.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800">Total</h3>
          <p className="text-2xl font-bold text-purple-600">{appointments.length}</p>
              </div>
            </div>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`px-4 py-2 rounded-md font-medium ${
            activeTab === 'upcoming' 
              ? 'bg-green-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Upcoming ({upcomingAppointments.length})
        </button>
        <button
          onClick={() => setActiveTab('past')}
          className={`px-4 py-2 rounded-md font-medium ${
            activeTab === 'past' 
              ? 'bg-green-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Past ({pastAppointments.length})
        </button>
        <button
          onClick={() => setActiveTab('cancelled')}
          className={`px-4 py-2 rounded-md font-medium ${
            activeTab === 'cancelled' 
              ? 'bg-green-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Cancelled ({cancelledAppointments.length})
        </button>
      </div>

      {/* Appointments List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {activeTab === 'upcoming' && upcomingAppointments.map(renderAppointmentCard)}
        {activeTab === 'past' && pastAppointments.map(renderAppointmentCard)}
        {activeTab === 'cancelled' && cancelledAppointments.map(renderAppointmentCard)}
        
        {((activeTab === 'upcoming' && upcomingAppointments.length === 0) ||
          (activeTab === 'past' && pastAppointments.length === 0) ||
          (activeTab === 'cancelled' && cancelledAppointments.length === 0)) && (
          <div className="col-span-2 text-center py-12">
            <p className="text-gray-500 text-lg">No appointments found for this category.</p>
        </div>
      )}
      </div>

      <div className="mt-8">
        <NavLink to="/" className="text-green-600 hover:underline">
          ← Back to Home
        </NavLink>
      </div>
    </div>
  );
};

export default Appointements;
