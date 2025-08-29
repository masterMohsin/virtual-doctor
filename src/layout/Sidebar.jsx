import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaBars, FaHome, FaUser, FaGoogleDrive } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [userRole, setUserRole] = useState("patient"); // default role

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (role) setUserRole(role);
  }, []);

  // Role-based sidebar items
  const sidebarItems = [
    { item: "Home", icon: <FaHome />, path: `/${userRole}/dashboard` },
    { item: "Appointments", icon: <FaGoogleDrive />, path: `/${userRole}/appointments` },
    { item: "Profile", icon: <FaUser />, path: `/${userRole}/profile` },
  ];

  const handleLogoutBtn = async () => {
  try {
    const token = localStorage.getItem("token");

    // Backend logout (optional)
    await axios.post(
      `${import.meta.env.VITE_API_URL}/api/auth/logout`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    // Clear storage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // localStorage.removeItem("userRole");

    // Role-based redirect (replace history → back button disabled)
    if (userRole === "doctor") {
      navigate("/doctor/login", { replace: true });
    } else {
      navigate("/patient/login", { replace: true });
    }
  } catch (error) {
    console.error("Logout error:", error.message);

    // Fallback: still clear and redirect
    localStorage.removeItem("token");
    // localStorage.removeItem("userRole");
    if (userRole === "doctor") {
      navigate("/doctor/login", { replace: true });
    } else {
      navigate("/patient/login", { replace: true });
    }
  }
};


  return (
    <>
      {/* Sidebar Toggle */}
      <button
        className="hidden md:block fixed top-4 left-4 z-50 bg-[#0EBE7F] text-white p-2 rounded-full shadow-lg"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <FaBars size={24} />
      </button>

      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } hidden md:block fixed top-0 left-0 z-40 min-h-screen w-60 bg-[#0EBE7F] p-4 rounded-lg m-3 shadow-lg transition-transform duration-300`}
      >
        {/* Logo */}
        <div className="mb-10 flex justify-center">
          <img className="w-48" src="/imgs/plus-logo.png" alt="Logo" />
        </div>

        {/* Nav Items */}
        <ul className="flex flex-col gap-6 mt-32">
          {sidebarItems.map((items, index) => (
            <li key={index}>
              <NavLink
                to={items.path}
                className={({ isActive }) =>
                  `flex items-center gap-4 text-xl text-white hover:text-gray-100 cursor-pointer ${
                    isActive ? "font-bold bg-opacity-20 text-[#1a237e]" : ""
                  }`
                }
              >
                <span>{items.icon}</span>
                <span className="font-semibold">{items.item}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Logout */}
        <div className="absolute bottom-6 left-6 flex items-center gap-2 text-white cursor-pointer">
          <img src="/imgs/Logout.png" alt="Logout" className="h-6" />
          <button
            onClick={handleLogoutBtn}
            className="text-xl font-semibold cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Bottom Navbar (Mobile) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#0EBE7F] flex justify-around items-center h-16 shadow-lg">
        <img src="/imgs/plus-logo.png" alt="Logo" className="h-8" />
        {sidebarItems.map((items, index) => (
          <NavLink
            key={index}
            to={items.path}
            className={({ isActive }) =>
              `flex flex-col items-center text-white text-xs ${
                isActive ? "font-bold bg-white bg-opacity-20 text-[#1a237e]" : ""
              }`
            }
          >
            <span className="text-xl">{items.icon}</span>
            <span>{items.item}</span>
          </NavLink>
        ))}
      </div>
    </>
  );
};

export default Sidebar;
