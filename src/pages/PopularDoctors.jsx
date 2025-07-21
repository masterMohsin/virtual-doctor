// import React, { useState } from "react";
// import { FaStar, FaHeart, FaRegHeart } from "react-icons/fa";
// import { initialDoctors } from "../config/popular-doctor";



// const StarRating = ({ rating }) => {
//   const fullStars = Math.round(rating);
//   return (
//     <div className="flex items-center space-x-1 text-yellow-400">
//       {[...Array(5)].map((_, i) => (
//         <FaStar key={i} className={i < fullStars ? "text-yellow-400" : "text-gray-300"} />
//       ))}
//     </div>
//   );
// };

// const PopularDoctors = () => {
//   const [doctors, setDoctors] = useState(initialDoctors);

//   const toggleFavorite = (id) => {
//     const updated = doctors.map((doc) =>
//       doc.id === id ? { ...doc, favorite: !doc.favorite } : doc
//     );
//     setDoctors(updated);
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-semibold mb-6">Popular Doctor</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
//         {doctors.map((doc) => (
//           <div
//             key={doc.id}
//             className="bg-white shadow-md rounded-xl p-4 flex items-start space-x-4 relative"
//           >
//             <img
//               src={doc.image}
//               alt={doc.name}
//               className="w-24 h-24 object-cover rounded-md"
//             />
//             <div className="flex-1">
//               <h3 className="text-md font-semibold">{doc.name}</h3>
//               <p className="text-gray-500 text-sm">{doc.specialty}</p>
//               <StarRating rating={doc.rating} />
//               <p className="text-xs text-gray-400 mt-1">
//                 {doc.rating.toFixed(1)} ({doc.views} views)
//               </p>
//             </div>
//             <button
//               className="absolute top-3 right-3"
//               onClick={() => toggleFavorite(doc.id)}
//             >
//               {doc.favorite ? (
//                 <FaHeart className="text-red-500" />
//               ) : (
//                 <FaRegHeart className="text-gray-400" />
//               )}
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PopularDoctors;








import React from "react";

import { initialDoctors } from "../config/popular-doctor";

const StarRating = ({ rating }) => {
//     const fullStars = Math.round(rating);
//   const emptyStars = 5 - fullStars;
//     const stars = Array(fullStars).fill("★").concat(Array(emptyStars).fill("☆"));
    
  return (
    <div className="flex space-x-1 mt-2">
      {[...Array(5)].map((_, i) => (
        <span key={i} className={i < rating ? "text-yellow-400" : "text-gray-300"}>
          ★
        </span>
      ))}
    </div>
  );
};

const PopularDoctors = () => {
    const doctors = initialDoctors;
    // const [doctors, setDoctors] = useState(initialDoctors);

  return (
    <div className="p-6 bg-gray-50">
      <h2 className="text-2xl font-semibold mb-6">Popular Doctor</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {doctors.map((doctor, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-xl p-4 text-center hover:shadow-xl transition-all"
          >
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-full h-72 object- rounded-lg mb-4 cursor-grab"
            />
            <h3 className="font-semibold text-lg">{doctor.name}</h3>
            <p className="text-sm text-gray-500">{doctor.specialty}</p>
            <StarRating rating={doctor.rating} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularDoctors;

