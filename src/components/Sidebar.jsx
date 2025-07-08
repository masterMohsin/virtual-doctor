// import React, { useState } from "react";
// import { FaBars, FaHome, FaUser, FaGoogleDrive } from "react-icons/fa";

// const Sidebar = () => {
//   const [isOpen, setIsOpen] = useState(true);

//   const sidebarItems = [
//     { item: "Home", icon: <FaHome /> },
//     { item: "Appointments", icon: <FaGoogleDrive /> },
//     { item: "Profile", icon: <FaUser /> },
//   ];

//   return (
//     <>
//       {/* Mobile Topbar with Toggle Button */}
//       {/* <div className="md:hidden flex justify-between items-center bg-[#0EBE7F] p-4">
//         <img src="/imgs/plus-logo.png" alt="Logo" className="h-8" />
//         <button onClick={() => setIsOpen(!isOpen)}>
//           <FaBars className="text-white text-2xl" />
//         </button>
//       </div> */}

//       {/* Sidebar */}
//       <div
//         className={`${
//           isOpen ? "translate-x-0" : "-translate-x-full"
//         } fixed md:static top-0 left-0 z-40 h-screen md:w-[260px] bg-[#0EBE7F] p-4 rounded-lg transition-transform duration-300 md:translate-x-0`}
//       >
//         {/* Logo */}
//         <div className="mb-10 flex justify-center">
//           <img className="w- hidden md:block" src="/imgs/plus-logo.png" alt="Logo" />
//         </div>

//         {/* Navigation Items */}
//         <ul className="flex flex-col gap-6 mt-32">
//           {sidebarItems.map((items, index) => (
//             <li
//               key={index}
//               className="flex items-center gap-4 text-xl text-white hover:text-gray-100 cursor-pointer"
//             >
//               <span>{items.icon}</span>
//               <span className="hidden md:block font-semibold">
//                 {items.item}
//               </span>
//             </li>
//           ))}
//         </ul>

//         {/* Logout */}
//         <div className="absolute bottom-6 left-2 flex items-center gap-2 text-white cursor-pointer">
//           <img src="/imgs/Logout.png" alt="Logout" className="h-6" />
//           <button className="text-xl font-semibold cursor-pointer hidden md:block">
//             Logout
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Sidebar;
