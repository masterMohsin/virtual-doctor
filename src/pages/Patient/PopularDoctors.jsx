import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const StarRating = ({ rating }) => {
  const fullStars = Math.round(rating);
  return (
    <div className="flex items-center space-x-1 text-yellow-400">
      {[...Array(5)].map((_, i) => (
        <FaStar
          key={i}
          className={i < fullStars ? "text-yellow-400" : "text-gray-300"}
        />
      ))}
    </div>
  );
};

const PopularDoctors = () => {
  const navigate = useNavigate();
  const [doctorsData, setDoctorsData] = useState([]);
  const url = import.meta.env.VITE_API_URL;

  // ✅ Fetch all doctors (with favourite info from backend)
  const getAllDoctors = async () => {
    try {
      const res = await axios.get(`${url}/api/users/get-doctors`, {
        withCredentials: true,
      });
      if (res.data.success) {
        // Backend must return `isFavourite` per doctor
        setDoctorsData(res.data.doctors);
      }
    } catch (error) {
      console.log("Error fetching doctors:", error.message);
    }
  };

  // ✅ Toggle favourite (only clicked doctor changes)
const toggleFavorite = async (doctorId) => {
  try {
    const res = await axios.post(
      `${url}/api/patients/add-favourites`,
      { doctorId },   // ✅ make sure doctorId is sent
      { withCredentials: true }
    );

    if (res.data.success) {
      setDoctorsData((prev) =>
        prev.map((doc) =>
          doc.id === doctorId ? { ...doc, isFavorite: res.data.isFavorite } : doc
        )
      );
    }
  } catch (error) {
    console.error("Error updating favourite:", error.response?.data || error.message);
  }
};



  useEffect(() => {
    getAllDoctors();
  }, []);

  const handleVerify = (doctorId) => {
    navigate(`/patient/popular-doctors/${doctorId}`);
  };

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-8">Popular Doctors</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {doctorsData.map((doctor) => (
          <div
            onClick={() => handleVerify(doctor?.id)}
            key={doctor?.id}
            className="bg-white shadow-md rounded-xl p-4 flex sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 relative hover:scale-105 cursor-pointer duration-200 transition-all"
          >
            <figure>
              <img
                src={doctor?.profileImage}
                alt={doctor?.fullName}
                className="w-28 h-28 object-cover cursor-pointer rounded-md mx-auto"
              />
            </figure>
            <div className="flex flex-col gap-2 flex-1 items-center sm:items-start">
              <h3 className="text-lg md:text-2xl font-semibold text-center sm:text-left">
                {doctor?.fullName}
              </h3>
              <p className="text-gray-500 text-sm md:text-md font-semibold text-center sm:text-left">
                {doctor?.specialization}
              </p>
              <div className="flex flex-col md:flex-row justify-between items-center w-full mt-2">
                <StarRating rating={doctor?.rating || 0} />
                <p className="text-xs text-gray-400 mt-1 md:mt-0 md:ml-2">
                  <span className="font-bold text-lg text-[#333333]">
                    {doctor?.rating || 0}
                  </span>{" "}
                  ({doctor?.yearsOfExperience} yrs exp.)
                </p>
              </div>
            </div>

            {/* ❤️ Button */}
            <button
  className="absolute top-3 right-3 cursor-pointer"
  onClick={(e) => {
    e.stopPropagation();
    toggleFavorite(doctor?.id); // ✅ use doctor.id from backend
  }}
  aria-label={doctor.isFavorite ? "Remove from favorites" : "Add to favorites"}
>
  {doctor?.isFavorite ? (
    <FaHeart className="text-red-500" />
  ) : (
    <FaRegHeart className="text-gray-400" />
  )}
</button>

          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularDoctors;




// {doctors.map((doc) => (
//           <div
//             onClick={() => handleVerify(doc.id)}
//             key={doc.id}
//             className="bg-white shadow-md rounded-xl p-4 flex flex- sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 relative hover:scale-105 cursor-pointer duration-200 transition-all"
//           >
//             <figure >
//               <img
//                 src={doc.image}
//                 alt={doc.name}
//                 className="w-28 h-28 object-cover cursor-pointer rounded-md mx-auto"
//               />
//             </figure>
//             <div className="flex flex-col gap-2 flex-1 items-center sm:items-start">
//               <h3 className="text-lg md:text-2xl font-semibold text-center sm:text-left">{doc.name}</h3>
//               <p className="text-gray-500 text-sm md:text-md font-semibold text-center sm:text-left">{doc.specialty}</p>
//               <div className="flex flex-col md:flex-row justify-between items-center w-full mt-2">
//                 <StarRating rating={doc.rating} />
//                 <p className="text-xs text-gray-400 mt-1 md:mt-0 md:ml-2">
//                   <span className="font-bold text-lg text-[#333333]">
//                     {doc.rating}
//                   </span> ({doc.views} views)
//                 </p>
//               </div>
//             </div>
//             <button
//               className="absolute top-3 right-3"
//               onClick={(e) => {
//                 e.stopPropagation(); // Prevent navigate on click
//                 toggleFavorite(doc.id);
//               }}
//             >
//               {doc.favorite ? (
//                 <FaHeart className="text-red-500" />
//               ) : (
//                 <FaRegHeart className="text-gray-400" />
//               )}
//             </button>
//           </div>
//         ))}



// ...existing code...