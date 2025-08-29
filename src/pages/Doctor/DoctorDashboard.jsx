import React, { useEffect, useState } from "react";
import API from "../../api/api.js";
import { FaCalendarAlt, FaClock } from "react-icons/fa";

const DoctorDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [dashboardCounts, setDashboardCounts] = useState({
    today: 0,
    pending: 0,
    upcoming: 0,
  });
  const [loading, setLoading] = useState(true);

  // Fetch dashboard counts
  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await API.get('/appointments/dashboard');
      console.log(response);
      
      const data = response.data;

      setDashboardCounts({
        today: data.today || 0,
        pending: data.pending || 0,
        upcoming: data.upcoming || 0,
      });
    } catch (err) {
      console.error('Error fetching appointments:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch doctor data
  const fetchUserData = async () => {
    try {
      setLoading(true);
      const res = await API.get('/users/get-doctor');

      if (res.data.success) {
        setUserData(res.data.doctor);
      }
    } catch (error) {
      console.log('Error fetching doctor data:', error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchAppointments();
  }, []);

  if (loading) {
    return (
      <div className="p-4 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-4 flex flex-col space-y-6">
      {/* Top Bar */}
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow">
        <div className="text-xl md:text-2xl font-semibold">
          Welcome back,{" "}
          <span className="text-blue-600">
            {userData?.name || "Doctor"}
          </span>
        </div>
        <img
          src={
            userData?.profileImage ||
            "https://images.unsplash.com/photo-1607746882042-944635dfe10e?crop=faces&fit=crop&w=200&h=200"
          }
          alt="Doctor"
          className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover"
        />
      </div>

      {/* Big Appointment Card */}
      <div className="rounded-2xl text-white w-full lg:w-[40%] py-4 px-4 bg-[#5852F2]">
        <div>
          <div className="bg-[#9793F3] bg-opacity-20 text-xl px-6 py-2 rounded-full w-fit mb-2">
            Today
          </div>
          <h2 className="font-bold text-xl md:text-2xl mb-3">
            Next Appointment
          </h2>
          <div className="flex items-center gap-2 mb-1">
            <FaCalendarAlt />
            <span>12 January 2025</span>
          </div>
          <div className="flex items-center gap-2">
            <FaClock />
            <span>01:30 PM</span>
          </div>
        </div>
        <div className="flex items-center justify-between mt-6">
          <div>
            <p className="font-semibold text-xl md:text-2xl">
              {userData?.name || "Dr. Smith"}
            </p>
            <p className="text-xl">
              {userData?.specialization || "General Practitioner"}
            </p>
          </div>
          <img
            src={
              userData?.profileImage ||
              "https://images.unsplash.com/photo-1588776814546-4b2f8fbb3c24?crop=faces&fit=crop&w=200&h=200"
            }
            alt="Doctor"
            className="w-20 h-20 rounded-full border-2 border-white object-cover"
          />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4 w-full lg:flex-1">
        {/* Card 1: Today Appointments */}
        <div className="rounded-2xl px-4 py-2 text-white bg-[#F2B544] h-32 flex flex-col justify-between">
          <div className="bg-[#F3CF8B] w-12 h-12 flex justify-center items-center rounded-full">
            <img
              className="w-6 h-6"
              src="https://img.icons8.com/ios-filled/50/ffffff/stethoscope.png"
              alt="Icon"
            />
          </div>
          <div>
            <h2 className="font-bold text-lg md:text-xl">
              Today's Appointments
            </h2>
            <p className="text-sm">{dashboardCounts.today} scheduled</p>
          </div>
        </div>

        {/* Card 2: Pending Appointments */}
        <div className="rounded-2xl px-4 py-2 text-white bg-[#EC4899] h-32 flex flex-col justify-between">
          <div className="bg-pink-300 w-12 h-12 flex justify-center items-center rounded-full">
            <img
              className="w-6 h-6"
              src="https://img.icons8.com/ios-filled/50/ffffff/hourglass.png"
              alt="Icon"
            />
          </div>
          <div>
            <h2 className="font-bold text-lg md:text-xl">Pending</h2>
            <p className="text-sm">{dashboardCounts.pending} pending</p>
          </div>
        </div>

        {/* Card 3: Chat Notifications */}
        <div className="rounded-2xl px-4 py-2 text-white bg-[#3B82F6] h-32 flex flex-col justify-between">
          <div className="bg-blue-300 w-12 h-12 flex justify-center items-center rounded-full">
            <img
              className="w-6 h-6"
              src="https://img.icons8.com/ios-filled/50/ffffff/chat.png"
              alt="Icon"
            />
          </div>
          <div>
            <h2 className="font-bold text-lg">Upcoming</h2>
            <p className="text-sm">{dashboardCounts.upcoming} upcoming</p>
          </div>
        </div>

        {/* Card 4: Completed Appointments */}
        <div className="rounded-2xl px-4 py-2 text-white bg-[#10B981] h-32 flex flex-col justify-between">
          <div className="bg-green-300 w-12 h-12 flex justify-center items-center rounded-full">
            <img
              className="w-6 h-6"
              src="https://img.icons8.com/ios-filled/50/ffffff/checked.png"
              alt="Icon"
            />
          </div>
          <div>
            <h2 className="font-bold text-lg">Completed</h2>
            <p className="text-sm">{dashboardCounts?.completed} done</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
