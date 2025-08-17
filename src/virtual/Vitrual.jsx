import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../layout/Layout";

// Patient pages
import LoginSelection from "../pages/Patient/LoginSelection";
import PatientDashboard from "../components/PatientDashboard";
import PatientLogin from "../pages/Patient/Login";
import FindDoctors from "../pages/Patient/FindDoctors";
import SelectTime from "../pages/Patient/SelectTime";
import DoctorProfile from "../pages/Patient/DoctorProfile";
import PopularDoctors from "../pages/Patient/PopularDoctors";
import PopularDoctorProfile from "../pages/Patient/PopularDoctorProfile";
import Appointements from "../pages/Patient/Appointements";
import Profile from "../pages/Patient/Profile";
import PatientRegister from "../pages/Patient/PatientRegister";
import ForgotPassword from "../pages/Patient/ForgotPassword";
import OTPVerification from "../pages/Patient/OTPVerify";

// Doctor pages
import DoctorRegister from "../pages/Doctor/DoctorRegister";
import DoctorLogin from "../pages/Doctor/DoctorLogin";
import DoctorDashboard from "../pages/Doctor/DoctorDashboard";
import Appointments from "../pages/Doctor/Appointments";
import DoctorsProfile from "../pages/Doctor/Profile";

const Vitrual = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      children: [
        { index: true, element: <LoginSelection /> },
        { path: "patient/login", element: <PatientLogin /> },
        { path: "doctor/login", element: <DoctorLogin /> },
        { path: "doctor/register", element: <DoctorRegister /> },
        { path: "patient/register", element: <PatientRegister /> },
        { path: "forgot-password", element: <ForgotPassword /> },
        { path: "otp", element: <OTPVerification /> },
      ],
    },
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "doctor",
          children: [
            { path: "dashboard", element: <DoctorDashboard /> },
            { path: "appointments", element: <Appointments /> },
            { path: "profile", element: <DoctorsProfile /> },
          ],
        },
        {
          path: "patient",
          children: [
            { path: "dashboard", element: <PatientDashboard /> },
            { path: "find-doctors", element: <FindDoctors /> },
            { path: "find-doctors/:id/select-time", element: <SelectTime /> },
            { path: "doctor-profile/:id", element: <DoctorProfile /> },
            { path: "popular-doctors", element: <PopularDoctors /> },
            { path: "popular-doctors/:id", element: <PopularDoctorProfile /> },
            { path: "popular-doctors/:id/select-time", element: <SelectTime /> },
            { path: "appointments", element: <Appointements /> },
            { path: "profile", element: <Profile /> },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Vitrual;
