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
    <div className="w-full  flex flex-col  md:flex-row min-h-screen md:w-full ">
    
      <div className="flex-1 mt-34  md:mt-0 z-10   md:p-6 overflow-hidden">
        {/* Top bar */}
         <form
          onSubmit={handleSearch}
          className="flex px-4  flex-col md:flex-row justify-between items-start md:items-center md:justify-center  mb-6 gap-4"
        >
          <SearchBar
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search for doctors..."
            onClick={() => navigate('/find-doctors')}
          />
        </form>

        {/* Flex Cards Section with Fixed Height */}
        <div className="cards w-full flex justify-around md:items-center">
          {/**appiontment card */}
          <div className="appiontment rounded-2xl text-white md:w-[29rem] w-52 h-68 py-2 px-2 bg-[#5852F2]">
             <div>
              <div className="bg-[#9793F3] bg-opacity-20 text-xl px-2 md:px-10 md:py-3 rounded-full w-fit mb-2">
                Today
              </div>
              <h2 className="font-bold text-xl md:text-2xl mb-3">Next Appointment</h2>
              <div className="flex items-center gap-2 mb-1">
                <FaCalendarAlt className="text-white" />
                <span>12 January 2025</span>
              </div>
              <div className="flex items-center gap-2 md:mb-4">
                <FaClock className="text-white" />
                <span>01:30 PM</span>
              </div>
            </div>
            <div className="flex items-center justify-between md:mt-2 mt-6 ">
              <div>
                <p className="font-semibold text-xl md:text-2xl">Dr. Mohsin</p>
                <p className="text-xl">General Practitioner</p>
              </div>
              <img
                src="https://img.freepik.com/free-photo/female-doctor-hospital-with-stethoscope_23-2148827774.jpg"
                alt="Doctor"
                className="w-20 h-20 rounded-full border-2 border-white"
              />
            </div>

          </div>
          <div className="line-cards ">
            <div className="medicin-card rounded-2xl px-4 text-white bg-[#F2B544] pt-2 w-44 md:w-[20rem] h-32">
              <div className="bg-[#F3CF8B]  w-12 h-12 flex justify-center items-center md:mt-2 rounded-full">
                <img className="w-6 h-6" src="./imgs/Vector.png" alt="Medicine" />
              </div>
              <div className=" mt-2  md:mt-0">
                <h2 className="font-bold text- md:text-2xl">My Medicine</h2>
                <p className="text-lg mt-">History</p>
              </div>

            </div>
            <div className="appiontment-card rounded-2xl text-white px-4 bg-red-500  md:w-[20rem] w-44  h-32">
              <div className="bg-[#F37165]  w-12 h-12 flex justify-center items-center mt-4  rounded-full">
                <img className="w-6 h-6" src="./imgs/Vector.png" alt="Medicine" />
              </div>
              <div className=" mt-2 ">
                <h2 className="font-bold  md:text-2xl">My Appiontment</h2>
                <p className="md:text-lg mt-">History</p>
              </div>

            </div>

          </div>
          {/** profile card */}
          <div className="profile -z-10 w-full md:w-[25rem]  absolute rounded-b-2xl md:rounded-2xl top-0 h-42 md:h-60 md:top-4 bg-[#5852F2] md:relative flex justify-evenly items-center text-white ">
            <div className="mt-4 md:text-center mb-2">
              <p>Hi Mohsin Muneer</p>
              <p className="font-semibold text-3xl md:text-lg sm:text-xl">Find Your Doctor</p>
              
            </div>
             <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw0Frc8TviQ1176lrkmb-uyJFpHZfXLYlQlw&s"
              alt="Mohsin Muneer"
              className="w-24 h-24 rounded-full md:absolute -top-10 border-4 border-white shadow-md"
            />

          </div>
        </div>

        {/* Categories Section */}
        <div className="bg-[#F0EEEE] shadow-lg  p-4 rounded-xl  mb-4 my-5 md:my-10">
          <div className="flex justify-between mb-4">
            <h3 className="font-bold text-xl">Category</h3>
            
          </div>

           <div className="flex flex-wrap justify-between gap-4 px-4 mt-4">
      {categoryIcons.map((cat, index) => {
        // Show only first 5 on mobile, all on md and above
        const isHiddenOnMobile = index >= 4 ? "hidden md:flex" : "flex";
        return (
          <div
            key={cat.id}
            className={`${isHiddenOnMobile} items-center justify-center w-16 h-16 rounded-full bg-indigo-500 text-white`}
          >
            <cat.icon size={28} />
          </div>
        );
      })}
    </div>
        </div>

        {/* Popular Doctors Section */}
        <div className="bg-blue-100 p-4 rounded-xl shadow">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-xl">Popular Doctor</h3>
        <button
          onClick={() => navigate("/popular-doctors")}
          className="text-blue-500 text-sm font-medium cursor-pointer"
        >
          See all &gt;
        </button>
      </div>

      <div className="flex flex-wrap">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="w-1/2 lg:w-1/6 p-2"
          >
            <div className="bg-white p-4 rounded-xl shadow text-center hover:scale-105 transition-transform duration-200">
              <img
                src={`https://i.pravatar.cc/100?img=${(i % 70) + 1}`}
                alt="Doctor"
                className="w-20 h-20 rounded-full mx-auto mb-2"
              />
              <p className="font-semibold text-sm">
                Dr. {i % 2 === 0 ? "Fillerup Grab" : "Blessing"}
              </p>
              <p className="text-xs text-gray-500">Medical Specialist</p>
              <p className="text-yellow-400 text-sm">★★★★★</p>
            </div>
          </div>
        ))}
      </div>
    </div>
        
       
      </div>
    </div>
  );
};

export default Dashboard;