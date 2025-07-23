import React, { useEffect, useRef, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { data as doctorsData } from "../config/data";
import SearchBar from "../components/SearchBar";

const FindDoctors = () => {
  const [search, setSearch] = useState("");
  const [doctors, setDoctors] = useState(doctorsData);
  const navigate = useNavigate();

  const inputRef = useRef(null)
  useEffect(() => {
    if(inputRef.current) {
      inputRef.current.focus()
    }
  },[])
  

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim() === "") {
      setDoctors(doctorsData);
    } else {
      // Only show doctors whose name starts with the search value (case-insensitive)
      const filteredDoctors = doctorsData.filter(doctor =>
        doctor.name.toLowerCase().includes(search.toLowerCase())
      );

    
      setDoctors(filteredDoctors);
    }
  };

  const handleBookNow = (doctorId) => {
    // Navigate to select time for the doctor
    navigate(`/find-doctors/${doctorId}/select-time`);
  };

  if (doctors.length === 0) {
    return (
      <div className="p-6">
        <form
          onSubmit={handleSearch}
          className="mb-6 flex flex-col md:flex-row gap-4 items-start md:items-center"
        >
          <SearchBar
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search for doctors..."
            
          />
        </form>
        <h2 className="text-xl font-semibold mb-4">No doctors found</h2>
        <p className="text-gray-500">Try searching for a different name.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <form
        onSubmit={handleSearch}
        className="mb-6 flex flex-col md:flex-row gap-4 items-start md:items-center"
      >
        <SearchBar
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search for doctors..."
          ref={inputRef}
        />
      </form>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {doctors.map((doctor) => (
          <div
            key={doctor.id}
            className="rounded-xl shadow-md p-4 flex justify-between items-center"
          >
            <div className="flex items-center gap-4">
              <img
                src={doctor.image || "/imgs/azeem.jpg"}
                alt={doctor.name}
                className="w-20 h-20 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-lg">{doctor.name}</h3>
                <p className="text-sm text-gray-500">{doctor.specialty}</p>
                <div className="flex gap-2 text-sm mt-1">
                  <span>⭐ {doctor.rating}</span>
                  <span>👨‍⚕️ {doctor.experience}</span>
                </div>
                <p className="text-green-500 text-sm mt-1">
                  {doctor.available} - {doctor.time}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              {doctor.liked ? (
                <FaHeart className="text-red-500" />
              ) : (
                <FaRegHeart className="text-gray-400" />
              )}
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                onClick={() => handleBookNow(doctor.id)}
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FindDoctors;
