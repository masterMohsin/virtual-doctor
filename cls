[1mdiff --git a/src/components/Sidebar.jsx b/src/components/Sidebar.jsx[m
[1mdeleted file mode 100644[m
[1mindex ee583a2..0000000[m
[1m--- a/src/components/Sidebar.jsx[m
[1m+++ /dev/null[m
[36m@@ -1,61 +0,0 @@[m
[31m-// import React, { useState } from "react";[m
[31m-// import { FaBars, FaHome, FaUser, FaGoogleDrive } from "react-icons/fa";[m
[31m-[m
[31m-// const Sidebar = () => {[m
[31m-//   const [isOpen, setIsOpen] = useState(true);[m
[31m-[m
[31m-//   const sidebarItems = [[m
[31m-//     { item: "Home", icon: <FaHome /> },[m
[31m-//     { item: "Appointments", icon: <FaGoogleDrive /> },[m
[31m-//     { item: "Profile", icon: <FaUser /> },[m
[31m-//   ];[m
[31m-[m
[31m-//   return ([m
[31m-//     <>[m
[31m-//       {/* Mobile Topbar with Toggle Button */}[m
[31m-//       {/* <div className="md:hidden flex justify-between items-center bg-[#0EBE7F] p-4">[m
[31m-//         <img src="/imgs/plus-logo.png" alt="Logo" className="h-8" />[m
[31m-//         <button onClick={() => setIsOpen(!isOpen)}>[m
[31m-//           <FaBars className="text-white text-2xl" />[m
[31m-//         </button>[m
[31m-//       </div> */}[m
[31m-[m
[31m-//       {/* Sidebar */}[m
[31m-//       <div[m
[31m-//         className={`${[m
[31m-//           isOpen ? "translate-x-0" : "-translate-x-full"[m
[31m-//         } fixed md:static top-0 left-0 z-40 h-screen md:w-[260px] bg-[#0EBE7F] p-4 rounded-lg transition-transform duration-300 md:translate-x-0`}[m
[31m-//       >[m
[31m-//         {/* Logo */}[m
[31m-//         <div className="mb-10 flex justify-center">[m
[31m-//           <img className="w- hidden md:block" src="/imgs/plus-logo.png" alt="Logo" />[m
[31m-//         </div>[m
[31m-[m
[31m-//         {/* Navigation Items */}[m
[31m-//         <ul className="flex flex-col gap-6 mt-32">[m
[31m-//           {sidebarItems.map((items, index) => ([m
[31m-//             <li[m
[31m-//               key={index}[m
[31m-//               className="flex items-center gap-4 text-xl text-white hover:text-gray-100 cursor-pointer"[m
[31m-//             >[m
[31m-//               <span>{items.icon}</span>[m
[31m-//               <span className="hidden md:block font-semibold">[m
[31m-//                 {items.item}[m
[31m-//               </span>[m
[31m-//             </li>[m
[31m-//           ))}[m
[31m-//         </ul>[m
[31m-[m
[31m-//         {/* Logout */}[m
[31m-//         <div className="absolute bottom-6 left-2 flex items-center gap-2 text-white cursor-pointer">[m
[31m-//           <img src="/imgs/Logout.png" alt="Logout" className="h-6" />[m
[31m-//           <button className="text-xl font-semibold cursor-pointer hidden md:block">[m
[31m-//             Logout[m
[31m-//           </button>[m
[31m-//         </div>[m
[31m-//       </div>[m
[31m-//     </>[m
[31m-//   );[m
[31m-// };[m
[31m-[m
[31m-// export default Sidebar;[m
[1mdiff --git a/src/components/Dashboard.jsx b/src/pages/Dashboard.jsx[m
[1msimilarity index 100%[m
[1mrename from src/components/Dashboard.jsx[m
[1mrename to src/pages/Dashboard.jsx[m
[1mdiff --git a/src/pages/FindDoctors.jsx b/src/pages/FindDoctors.jsx[m
[1mindex 2b987cd..f32d99c 100644[m
[1m--- a/src/pages/FindDoctors.jsx[m
[1m+++ b/src/pages/FindDoctors.jsx[m
[36m@@ -1,7 +1,7 @@[m
 import React, { useState } from "react";[m
 import { FaHeart, FaRegHeart } from "react-icons/fa";[m
 import { data as doctorsData } from "../config/data";[m
[31m-import SearchBar from "../components/SearchBar";[m
[32m+[m[32mimport SearchBar from "./SearchBar";[m
  // Assuming you have a JSON file with doctor data[m
 [m
 const FindDoctors = () => {[m
[1mdiff --git a/src/pages/Home.jsx b/src/pages/Home.jsx[m
[1mindex b00524b..a01ac0b 100644[m
[1m--- a/src/pages/Home.jsx[m
[1m+++ b/src/pages/Home.jsx[m
[36m@@ -1,5 +1,5 @@[m
 import React from 'react'[m
[31m-import Dashboard from '../components/Dashboard'[m
[32m+[m[32mimport Dashboard from './Dashboard';[m
 import Sidebar from '../layout/Sidebar'[m
 [m
 const Home = () => {[m
[1mdiff --git a/src/components/SearchBar.jsx b/src/pages/SearchBar.jsx[m
[1msimilarity index 100%[m
[1mrename from src/components/SearchBar.jsx[m
[1mrename to src/pages/SearchBar.jsx[m
[1mdiff --git a/src/pages/Sidebar.jsx b/src/pages/Sidebar.jsx[m
[1mnew file mode 100644[m
[1mindex 0000000..27156bb[m
[1m--- /dev/null[m
[1m+++ b/src/pages/Sidebar.jsx[m
[36m@@ -0,0 +1,61 @@[m
[32m+[m[32mimport React, { useState } from "react";[m
[32m+[m[32mimport { FaBars, FaHome, FaUser, FaGoogleDrive } from "react-icons/fa";[m
[32m+[m
[32m+[m[32mconst Sidebar = () => {[m
[32m+[m[32m  const [isOpen, setIsOpen] = useState(true);[m
[32m+[m
[32m+[m[32m  const sidebarItems = [[m
[32m+[m[32m    { item: "Home", icon: <FaHome /> },[m
[32m+[m[32m    { item: "Appointments", icon: <FaGoogleDrive /> },[m
[32m+[m[32m    { item: "Profile", icon: <FaUser /> },[m
[32m+[m[32m  ];[m
[32m+[m
[32m+[m[32m  return ([m
[32m+[m[32m    <>[m
[32m+[m[32m      {/* Mobile Topbar with Toggle Button */}[m
[32m+[m[32m      {/* <div className="md:hidden flex justify-between items-center bg-[#0EBE7F] p-4">[m
[32m+[m[32m        <img src="/imgs/plus-logo.png" alt="Logo" className="h-8" />[m
[32m+[m[32m        <button onClick={() => setIsOpen(!isOpen)}>[m
[32m+[m[32m          <FaBars className="text-white text-2xl" />[m
[32m+[m[32m        </button>[m
[32m+[m[32m      </div> */}[m
[32m+[m
[32m+[m[32m      {/* Sidebar */}[m
[32m+[m[32m      <div[m
[32m+[m[32m        className={`${[m
[32m+[m[32m          isOpen ? "translate-x-0" : "-translate-x-full"[m
[32m+[m[32m        } fixed md:static top-0 left-0 z-40 h-screen md:w-[260px] bg-[#0EBE7F] p-4 rounded-lg transition-transform duration-300 md:translate-x-0`}[m
[32m+[m[32m      >[m
[32m+[m[32m        {/* Logo */}[m
[32m+[m[32m        <div className="mb-10 flex justify-center">[m
[32m+[m[32m          <img className="w- hidden md:block" src="/imgs/plus-logo.png" alt="Logo" />[m
[32m+[m[32m        </div>[m
[32m+[m
[32m+[m[32m        {/* Navigation Items */}[m
[32m+[m[32m        <ul className="flex flex-col gap-6 mt-32">[m
[32m+[m[32m          {sidebarItems.map((items, index) => ([m
[32m+[m[32m            <li[m
[32m+[m[32m              key={index}[m
[32m+[m[32m              className="flex items-center gap-4 text-xl text-white hover:text-gray-100 cursor-pointer"[m
[32m+[m[32m            >[m
[32m+[m[32m              <span>{items.icon}</span>[m
[32m+[m[32m              <span className="hidden md:block font-semibold">[m
[32m+[m[32m                {items.item}[m
[32m+[m[32m              </span>[m
[32m+[m[32m            </li>[m
[32m+[m[32m          ))}[m
[32m+[m[32m        </ul>[m
[32m+[m
[32m+[m[32m        {/* Logout */}[m
[32m+[m[32m        <div className="absolute bottom-6 left-2 flex items-center gap-2 text-white cursor-pointer">[m
[32m+[m[32m          <img src="/imgs/Logout.png" alt="Logout" className="h-6" />[m
[32m+[m[32m          <button className="text-xl font-semibold cursor-pointer hidden md:block">[m
[32m+[m[32m            Logout[m
[32m+[m[32m          </button>[m
[32m+[m[32m        </div>[m
[32m+[m[32m      </div>[m
[32m+[m[32m    </>[m
[32m+[m[32m  );[m
[32m+[m[32m};[m
[32m+[m
[32m+[m[32mexport default Sidebar;[m
