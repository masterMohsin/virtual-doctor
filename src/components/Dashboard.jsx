import React, { useState } from "react";
import { TbDental } from "react-icons/tb";
import { GiNoseFront,GiKidneys } from "react-icons/gi";
import { LuBrain,LuBone  } from "react-icons/lu";


import { MdHearing } from "react-icons/md";
import {

  FaSearch,
  FaCalendarAlt,
  FaClock,
  FaEye ,
} from "react-icons/fa";
import SearchBar from "./SearchBar";

import { useNavigate } from "react-router-dom";
import { categoryIcons } from "../config/category-icons";



const Dashboard = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if(search.trim() !== "") {
      navigate(`/find-doctors?search=${encodeURIComponent(search)}`);
  }
  } 
  return (
    <div className="flex flex-col md:flex-row min-h-screen md:w-full bg-white">
    
      <div className="flex-1 p-4 md:p-6 overflow-hidden">
        {/* Top bar */}
         <form
          onSubmit={handleSearch}
          className="flex flex-col md:flex-row justify-between items-start md:items-center md:justify-center mb-6 gap-4"
        >
          <SearchBar
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search for doctors..."
          />
        </form>

        {/* Flex Cards Section with Fixed Height */}
        <div className="flex flex-wrap  justify-evenly gap-6 px-4 mb-3 h-[300px] items-stretch">
          {/* Next Appointment Card */}
          <div className="bg-[#5B61EB] text-white rounded-xl p-6 w-full md:w-[25rem] h-full flex flex-col justify-between">
            <div>
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
            </div>
            <div className="flex items-center justify-between mt-2">
              <div>
                <p className="font-semibold text-2xl">Dr. Mohsin</p>
                <p className="text-xl">General Practitioner</p>
              </div>
              <img
                src="https://i.ibb.co/FsVtN8v/doc-avatar.png"
                alt="Doctor"
                className="w-20 h-20 rounded-full border-2 border-white"
              />
            </div>
          </div>

          {/* Medicine and Appointment Cards */}
          <div className="flex flex-col gap-4 w-full md:w-[25rem] h-full">
            <div className="bg-[#F2B544] text-white rounded-xl p-4 flex  gap-4 flex-1">
              <div className="bg-[#F3CF8B] w-12 h-12 flex justify-center items-center mt-6 rounded-full">
                <img className="w-6 h-6" src="./imgs/Vector.png" alt="Medicine" />
              </div>
              <div className="mt-6">
                <h2 className="font-bold text-2xl">My Medicine</h2>
                <p className="text-lg mt-2">History</p>
              </div>
            </div>
            <div className="bg-red-500 text-white rounded-xl p-4 flex  gap-4 flex-1">
              <div className="bg-[#F37165] w-12 h-12 flex justify-center mt-6 items-center rounded-full">
                <img className="w-6 h-6" src="./imgs/Clock.png" alt="Clock" />
              </div>
              <div className="mt-6">
                <h2 className="font-bold text-2xl">Appointments</h2>
                <p className="text-lg mt-2">History</p>
              </div>
            </div>
          </div>

          {/* Profile Card */}
          <div className="bg-[#5B61EB] text-white rounded-xl px-4 py-8 w-full max-w-[15rem] h-full flex flex-col items-center justify-center">
            <img
              src="https://i.ibb.co/Z2xkv7W/mohsin.png"
              alt="Mohsin Muneer"
              className="w-24 h-24 rounded-full border-4 border-white shadow-md"
            />
            <div className="mt-4 text-center">
              <p className="font-semibold text-lg sm:text-xl">Mohsin Muneer</p>
            </div>
          </div>
        </div>

        {/* Categories Section */}
        <div className="bg-[#F0EEEE] shadow-lg  p-4 rounded-xl  mb-4">
          <div className="flex justify-between mb-4">
            <h3 className="font-semibold">Category</h3>
            <button  className="text-blue-500 text-sm cursor-pointer">See all &gt;</button>
          </div>

          <div className="flex flex-wrap justify-between">
            {categoryIcons.map((cat, index) => {
              return (
                <>
                <div
                key={cat.id}
                className="bg-indigo-500 text-white p-3 rounded-full w-16 h-16 flex items-center justify-center"
              >
                <div>
                  {cat.icon && <cat.icon size={32} />}
                </div>
              </div>
                </>
              )
              
            })}
          </div>
        </div>

        {/* Popular Doctors Section */}
        <div className="bg-blue-100 p-1 pl-4 pb-3 rounded-xl shadow">
          <div className="flex justify-between mb-1">
            <h3 className="font-semibold">Popular Doctor</h3>
            <button onClick={() => navigate('/popular-doctors')} className="text-blue-500 text-sm cursor-pointer">See all &gt;</button>
          </div>
          <div className="flex flex-wrap justify-evenly">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white p-4 rounded-xl shadow text-center w-[10rem]"
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