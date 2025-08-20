import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaCalendarAlt, FaClock } from "react-icons/fa";

const DoctorDashboard = () => {
  const [userData,setUserData] = useState(null)

  const user = async () => {
    try {
      const url = import.meta.env.VITE_API_URL;
      const res = await axios.get(`${url}/api/users/get-doctor`, {
        withCredentials: true,
      });
      console.log(res.data.doctor);
      
      if (res.data.success) {
        setUserData(res.data.doctor);
      }
    } catch (error) {
      console.log(error.message);
      
    }
  }

  useEffect(() => {
    user()
  },[])
  return (
    <div className="p-4 space-y-6">
      {/* Top Bar */}
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow">
        <div className="text-xl md:text-2xl font-semibold">
          Welcome back, <span className="text-blue-600">{userData?.name}</span>
        </div>
        <img
          src={userData?.profileImage || "/imgs/default-profile.png"}
          alt="Doctor"
          className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover"
        />
      </div>

      {/* Appointment + Cards Row */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Big Appointment Card */}
        <div className="rounded-2xl text-white w-full lg:w-[40%] py-4 px-4 bg-[#5852F2]">
          <div>
            <div className="bg-[#9793F3] bg-opacity-20 text-xl px-6 py-2 rounded-full w-fit mb-2">
              Today
            </div>
            <h2 className="font-bold text-xl md:text-2xl mb-3">Next Appointment</h2>
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
              <p className="font-semibold text-xl md:text-2xl">Dr. Mohsin</p>
              <p className="text-xl">General Practitioner</p>
            </div>
            <img
              src="https://img.freepik.com/free-photo/female-doctor-hospital-with-stethoscope_23-2148827774.jpg"
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
      <img className="w-6 h-6" src="./imgs/Vector.png" alt="Icon" />
    </div>
    <div>
      <h2 className="font-bold text-lg md:text-xl">Today’s Appointments</h2>
      <p className="text-sm">7 scheduled</p>
    </div>
  </div>

  {/* Card 2: Pending Appointments */}
  <div className="rounded-2xl px-4 py-2 text-white bg-[#EC4899] h-32 flex flex-col justify-between">
    <div className="bg-pink-300 w-12 h-12 flex justify-center items-center rounded-full">
      <img className="w-6 h-6" src="./imgs/Vector.png" alt="Icon" />
    </div>
    <div>
      <h2 className="font-bold text-lg md:text-xl">Pending</h2>
      <p className="text-sm">3 carryover</p>
    </div>
  </div>

  {/* Card 3: Chat Notifications */}
  <div className="rounded-2xl px-4 py-2 text-white bg-[#3B82F6] h-32 flex flex-col justify-between">
    <div className="bg-blue-300 w-12 h-12 flex justify-center items-center rounded-full">
      <img className="w-6 h-6" src="./imgs/Vector.png" alt="Icon" />
    </div>
    <div>
      <h2 className="font-bold text-lg">Chat Notifications</h2>
      <p className="text-sm">5 unread</p>
    </div>
  </div>

  {/* Card 4: Completed Appointments */}
  <div className="rounded-2xl px-4 py-2 text-white bg-[#10B981] h-32 flex flex-col justify-between">
    <div className="bg-green-300 w-12 h-12 flex justify-center items-center rounded-full">
      <img className="w-6 h-6" src="./imgs/Vector.png" alt="Icon" />
    </div>
    <div>
      <h2 className="font-bold text-lg">Completed</h2>
      <p className="text-sm">14 done</p>
    </div>
  </div>
</div>

      </div>
      

      {/* Previous Appointments */}
      <div className="bg-white p-6 rounded-2xl shadow-md w-full">
  <h2 className="text-2xl font-bold text-gray-800 mb-6">Previous Completed Appointments</h2>
  <ul className="space-y-4">
    <li className="flex items-center gap-4 border-b pb-4">
      <img
        src="https://randomuser.me/api/portraits/men/32.jpg"
        alt="Ali Khan"
        className="w-14 h-14 rounded-full object-cover border-2 border-indigo-500"
      />
      <div>
        <p className="font-semibold text-lg text-gray-700">Ali Khan</p>
        <p className="text-sm text-gray-500">Date: 28 July 2025</p>
        <span className="inline-block mt-1 text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
          Status: Completed
        </span>
      </div>
    </li>

    <li className="flex items-center gap-4 border-b pb-4">
      <img
        src="https://randomuser.me/api/portraits/women/44.jpg"
        alt="Sara Ahmed"
        className="w-14 h-14 rounded-full object-cover border-2 border-indigo-500"
      />
      <div>
        <p className="font-semibold text-lg text-gray-700">Sara Ahmed</p>
        <p className="text-sm text-gray-500">Date: 27 July 2025</p>
        <span className="inline-block mt-1 text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
          Status: Completed
        </span>
      </div>
    </li>

    {/* Add more patients if needed */}
  </ul>
</div>

      
    </div>
  );
};

export default DoctorDashboard;
