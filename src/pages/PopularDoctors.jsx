import React, { useEffect, useState } from "react";
import { FaStar, FaHeart, FaRegHeart } from "react-icons/fa";
import { initialDoctors } from "../config/popular-doctor";
import { useNavigate } from "react-router-dom";

const StarRating = ({ rating }) => {
  const fullStars = Math.round(rating);
  return (
    <div className="flex items-center space-x-1 text-yellow-400">
      {[...Array(5)].map((_, i) => (
        <FaStar key={i} className={i < fullStars ? "text-yellow-400" : "text-gray-300"} />
      ))}
    </div>
  );
};

const PopularDoctors = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);

  // Load from localStorage or fall back to initialDoctors
 useEffect(() => {
  const storedDoctors = localStorage.getItem("popularDoctors");
  try {
    const parsed = storedDoctors ? JSON.parse(storedDoctors) : null;
    if (parsed && parsed.length > 0) {
      setDoctors(parsed);
    } else {
      setDoctors(initialDoctors);
    }
  } catch (error) {
    console.error("Invalid JSON in localStorage, resetting to initialDoctors");
    setDoctors(initialDoctors);
  }
}, []);


  // Save to localStorage on updates
  useEffect(() => {
    if (doctors.length > 0) {
      localStorage.setItem("popularDoctors", JSON.stringify(doctors));
    }
  }, [doctors]);

  const toggleFavorite = (id) => {
    const updated = doctors.map((doc) =>
      doc.id === id ? { ...doc, favorite: !doc.favorite } : doc
    );
    setDoctors(updated);
  };

  const handleVerify = (doctorId) => {
    navigate(`/popular-doctors/${doctorId}`)
  }

    

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-">Popular Doctors</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {doctors.map((doc) => (
          <div
            onClick={() => handleVerify(doc.id)}
            key={doc.id}
            className="bg-white shadow-md rounded-xl p-4 flex flex- sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 relative"
          >
            <figure >
              <img
                src={doc.image}
                alt={doc.name}
                className="w-28 h-28 object-cover cursor-pointer rounded-md mx-auto"
              />
            </figure>
            <div className="flex flex-col gap-2 flex-1 items-center sm:items-start">
              <h3 className="text-lg md:text-2xl font-semibold text-center sm:text-left">{doc.name}</h3>
              <p className="text-gray-500 text-sm md:text-md font-semibold text-center sm:text-left">{doc.specialty}</p>
              <div className="flex flex-col md:flex-row justify-between items-center w-full mt-2">
                <StarRating rating={doc.rating} />
                <p className="text-xs text-gray-400 mt-1 md:mt-0 md:ml-2">
                  <span className="font-bold text-lg text-[#333333]">
                    {doc.rating}
                  </span> ({doc.views} views)
                </p>
              </div>
            </div>
            <button
              className="absolute top-3 right-3"
              onClick={(e) => {
                e.stopPropagation(); // Prevent navigate on click
                toggleFavorite(doc.id);
              }}
            >
              {doc.favorite ? (
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




// import React from "react";

// import { initialDoctors } from "../config/popular-doctor";
// import { useNavigate } from "react-router-dom";

// const StarRating = ({ rating }) => {
// //     const fullStars = Math.round(rating);
// //   const emptyStars = 5 - fullStars;
// //     const stars = Array(fullStars).fill("★").concat(Array(emptyStars).fill("☆"));
    
//   return (
//     <div className="flex space-x-1 mt-2">
//       {[...Array(5)].map((_, i) => (
//         <span key={i} className={i < rating ? "text-yellow-400" : "text-gray-300"}>
//           ★
//         </span>
//       ))}
//     </div>
//   );
// };

// const PopularDoctors = () => {
//     const doctors = initialDoctors;
//     const navigate = useNavigate()
//     // const [doctors, setDoctors] = useState(initialDoctors);

//   return (
//     <div className="p-6 bg-gray-50">
//       <h2 className="text-2xl font-semibold mb-6">Popular Doctor</h2>
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         {doctors.map((doctor, index) => (
//           <div
//             key={index}
//             className="bg-white shadow-md rounded-xl p-3 text-center hover:shadow-xl transition-all"
//           >
//             <figure onClick={() => navigate('/doctor-profile')} className="flex items-center justify-center">
//               <img
//               src={doctor.image}
//               alt={doctor.name}
//               className="w-80 h-80 flex items-center justify-center object-fit rounded-lg mb-4 cursor-grab"
//             />
//             </figure>
//             <h3 className="font-semibold text-lg">{doctor.name}</h3>
//             <p className="text-sm text-gray-500">{doctor.specialty}</p>
//             <StarRating rating={doctor.rating} />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PopularDoctors;