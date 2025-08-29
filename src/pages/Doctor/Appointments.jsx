import React, { useState, useEffect } from "react";
import API from "../../api/api.js";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('today');

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await API.get('/appointments/doctor/dashboard');
      console.log(response);
      
      setAppointments(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch appointments');
      console.error('Error fetching appointments:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (appointmentId, action) => {
    try {
      let endpoint = '';
      switch (action) {
        case 'confirm':
          endpoint = `/appointments/${appointmentId}/confirm`;
          break;
        case 'complete':
          endpoint = `/appointments/${appointmentId}/complete`;
          break;
        case 'cancel':
          endpoint = `/appointments/${appointmentId}/cancel`;
          break;
        default:
          return;
      }
      
      await API.patch(endpoint);
      fetchAppointments(); // Refresh the list
    } catch (err) {
      setError('Failed to update appointment status');
      console.error('Error updating appointment:', err);
    }
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
      case 'confirmed': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      case 'completed': return 'bg-blue-100 text-blue-700';
      case 'rescheduled': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const renderAppointmentCard = (appointment) => {
    const { date, time } = formatDateTime(appointment.startTime);
    
  return (
      <div
        key={appointment._id}
        className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition-all duration-200"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-blue-600">
                {appointment.patient?.fullName?.charAt(0) || 'P'}
              </span>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                {appointment.patient?.fullName || 'Unknown Patient'}
              </h3>
              <p className="text-gray-600">{appointment.patient?.email}</p>
              {appointment.patient?.phoneNumber && (
                <p className="text-gray-600">{appointment.patient.phoneNumber}</p>
              )}
            </div>
          </div>
          <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(appointment.status)}`}>
            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
              </span>
            </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-500">Date</p>
            <p className="font-semibold">{date}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Time</p>
            <p className="font-semibold">{time}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Duration</p>
            <p className="font-semibold">
              {Math.round((new Date(appointment.endTime) - new Date(appointment.startTime)) / 60000)} min
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Type</p>
            <p className="font-semibold capitalize">
              {appointment.locationType?.replace('_', ' ') || 'Video'}
            </p>
          </div>
        </div>

        {appointment.reason && (
          <div className="mb-4">
            <p className="text-sm text-gray-500">Reason</p>
            <p className="text-gray-800">{appointment.reason}</p>
          </div>
        )}

        {appointment.meetUrl && appointment.locationType === 'video' && (
          <div className="mb-4">
            <p className="text-sm text-gray-500">Meeting URL</p>
            <a 
              href={appointment.meetUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Join Meeting
            </a>
          </div>
        )}

        <div className="flex gap-2">
          {appointment.status === 'pending' && (
            <>
              <button
                onClick={() => handleStatusUpdate(appointment._id, 'confirm')}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
              >
                Confirm
              </button>
              <button
                onClick={() => handleStatusUpdate(appointment._id, 'cancel')}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
              >
                Cancel
              </button>
            </>
          )}
          {appointment.status === 'confirmed' && (
            <button
              onClick={() => handleStatusUpdate(appointment._id, 'complete')}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Mark Complete
            </button>
          )}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="p-4">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Appointments Dashboard</h1>
        <p className="text-gray-600">Manage your patient appointments</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800">Today</h3>
          <p className="text-2xl font-bold text-blue-600">{appointments.todayAppointments?.length || 0}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800">Upcoming</h3>
          <p className="text-2xl font-bold text-green-600">{appointments.upcomingAppointments?.length || 0}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800">Completed</h3>
          <p className="text-2xl font-bold text-purple-600">{appointments.stats?.completed || 0}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800">Pending</h3>
          <p className="text-2xl font-bold text-yellow-600">{appointments.stats?.pending || 0}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('today')}
          className={`px-4 py-2 rounded-md font-medium ${
            activeTab === 'today' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Today ({appointments.todayAppointments?.length || 0})
        </button>
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`px-4 py-2 rounded-md font-medium ${
            activeTab === 'upcoming' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Upcoming ({appointments.upcomingAppointments?.length || 0})
        </button>
        <button
          onClick={() => setActiveTab('past')}
          className={`px-4 py-2 rounded-md font-medium ${
            activeTab === 'past' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Past ({appointments.pastAppointments?.length || 0})
        </button>
      </div>

      {/* Appointments List */}
      <div className="grid gap-6 md:grid-cols-2">
        {activeTab === 'today' && appointments.todayAppointments?.map(renderAppointmentCard)}
        {activeTab === 'upcoming' && appointments.upcomingAppointments?.map(renderAppointmentCard)}
        {activeTab === 'past' && appointments.pastAppointments?.map(renderAppointmentCard)}
        
        {((activeTab === 'today' && (!appointments.todayAppointments || appointments.todayAppointments.length === 0)) ||
          (activeTab === 'upcoming' && (!appointments.upcomingAppointments || appointments.upcomingAppointments.length === 0)) ||
          (activeTab === 'past' && (!appointments.pastAppointments || appointments.pastAppointments.length === 0))) && (
          <div className="col-span-2 text-center py-12">
            <p className="text-gray-500 text-lg">No appointments found for this period.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointments;
