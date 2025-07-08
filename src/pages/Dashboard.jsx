import React from "react";
import {
  FaHome,
  FaUserMd,
  FaUser,
  FaSignOutAlt,
  FaSearch,
  FaCalendarAlt,
  FaClock,
} from "react-icons/fa";

const Dashboard = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-full md:w-1/5 bg-green-600 text-white flex flex-col items-center py-6">
        <div className="text-4xl mb-10">🩺</div>
        <div className="space-y-6">
          <div className="flex items-center gap-2 cursor-pointer">
            <FaHome /> <span>Home</span>
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <FaUserMd /> <span>Appointments</span>
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <FaUser /> <span>Profile</span>
          </div>
        </div>
        <div className="mt-auto mb-4 flex items-center gap-2 cursor-pointer">
          <FaSignOutAlt /> <span>Log Out</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6 overflow-auto">
        {/* Top bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center md:justify-center mb-6 gap-4">
          <div className="relative w-full md:w-full">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-4 rounded-xl shadow-xl bg-[#FFFFFF]"
            />
            <FaSearch className="absolute top-5 right-3 text-gray-400" />
          </div>

          {/* <div className="flex items-center gap-3">
            <img
              src="https://i.pravatar.cc/40"
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
            <span className="font-semibold">Master</span>
          </div> */}
        </div>

        {/* Appointments & Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-24 px-10 mb-6 mt-16 md:w-full ">
          {/* <div className="bg-[#5852F2] text-white rounded-xl p-4 opacity-[100%]">
            <button className='bg-[#9793F2] px-8 py-3 rounded-full mt-5'>Today</button>
            <h2 className="font-bold text-lg mt-3">Next Appointment</h2>
            <p className="text-sm mt-2">12 January 2025 - 01:30 PM</p>
            <div className="mt-4">
              <p>Dr. Selly</p>
              <span className="text-sm">General Practitioner</span>
            </div>
          </div> */}

          <div className="bg-[#5B61EB] text-white rounded-xl p-4 px- w-full md:w-96">
            <div className="bg-[#9793F3] bg-opacity-20 text-xl px-10 py-3 rounded-full w-fit mb-2">
              Today
            </div>
            <h2 className="font-bold text-2xl mb-3">Next Appointment</h2>
            <div className="flex items-center gap-2 mb-1">
              <FaCalendarAlt className="text-white" />
              <span>12 January 2025</span>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <FaClock className="text-white" />
              <span>01:30 PM</span>
            </div>

            <div className="flex items-center gap-10">
              <div>
                <p className="font-semibold text-2xl">Dr. Zain</p>
                <p className="text-xl">General Practitioner</p>
              </div>

              <div className="flex-shrink-0">
                <img
                  src="https://i.ibb.co/FsVtN8v/doc-avatar.png"
                  alt="Dr. Selly"
                  className="w-24 h-24 rounded-full border-2 border-white"
                />
              </div>
            </div>
          </div>

          <div className="flex md:flex-col sm:flex-row gap-4 justify-between w-full md:w-96">
      <div className="bg-[#F2B544] text-white rounded-xl p-4 flex-1">
        <div className="bg-[#F3CF8B] w-12 h-12 flex justify-center items-center rounded-full">
          <img className="w-6 h-6" src="./imgs/Vector.png" alt="Medicine Icon" />
        </div>
        <h2 className="font-bold text-2xl mt-2">My Medicine</h2>
        <p className="text-sm mt-2">History</p>
      </div>

      <div className="bg-red-500 text-white rounded-xl p-4 flex-1">
        <div className="bg-[#F37165] w-12 h-12 flex justify-center items-center rounded-full">
          <img className="w-6 h-6" src="./imgs/Clock.png" alt="Clock Icon" />
        </div>
        <h2 className="font-bold text-2xl mt-2">Appointments</h2>
        <p className="text-sm mt-2">History</p>
      </div>
    </div>
          <div className="bg-[#5B61EB] text-white rounded-xl px-4 py-8 w-full max-w-xs sm:max-w-sm md:max-w-sm lg:max-w-60 flex flex-col items-center">
            <div className="-mt-16 sm:-mt-20">
              <img
                src="https://i.ibb.co/Z2xkv7W/mohsin.png"
                alt="Mohsin Muneer"
                className="w-20 sm:w-24 md:w-28 h-20 sm:h-24 md:h-28 rounded-full border-4 border-white shadow-md"
              />
            </div>
            <div className="mt-4 text-center">
              <p className="font-semibold text-lg sm:text-xl">Mohsin Muneer</p>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="bg-white p-4 rounded-xl shadow mb-6">
          <div className="flex justify-between mb-4">
            <h3 className="font-semibold">Category</h3>
            <button className="text-blue-500 text-sm">See all &gt;</button>
          </div>
          <div className="flex flex-wrap gap-4">
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className="bg-indigo-500 text-white p-3 rounded-full w-12 h-12 flex items-center justify-center"
              >
                🩺
              </div>
            ))}
          </div>
        </div>

        {/* Popular Doctors */}
        <div className="bg-blue-100 p-4 rounded-xl shadow">
          <div className="flex justify-between mb-4">
            <h3 className="font-semibold">Popular Doctor</h3>
            <button className="text-blue-500 text-sm">See all &gt;</button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-white p-4 rounded-xl shadow text-center"
              >
                <img
                  src={`https://i.pravatar.cc/100?img=${i + 1}`}
                  alt="Doctor"
                  className="w-20 h-20 rounded-full mx-auto mb-2"
                />
                <p className="font-semibold">
                  Dr. {i % 2 === 0 ? "Fillerup Grab" : "Blessing"}
                </p>
                <p className="text-sm text-gray-500">Medical Specialist</p>
                <p className="text-yellow-400">★★★★★</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
