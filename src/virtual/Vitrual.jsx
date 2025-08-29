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
// import Appointements from "../pages/Patient/Appointements";
import PatientAppointments from "../pages/Patient/PatientAppointment";
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

// ProtectedRoute
import ProtectedRoute from "../components/ProtectedRoute";
import DoctorAppointments from "../pages/Doctor/DoctorAppointments";
import MeetPage from "../components/MeetPage";


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
        { path:"/meet/:roomId",  element:<MeetPage />}, 
      ],
    },
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "doctor",
          children: [
            {
              path: "dashboard",
              element: (
                <ProtectedRoute role="doctor">
                  <DoctorDashboard />
                </ProtectedRoute>
              ),
            },
            {
              path: "appointments",
              element: (
                <ProtectedRoute role="doctor">
                  <DoctorAppointments />
                </ProtectedRoute>
              ),
            },
            {
              path: "profile",
              element: (
                <ProtectedRoute role="doctor">
                  <DoctorsProfile />
                </ProtectedRoute>
              ),
            },
          ],
        },
        {
          path: "patient",
          children: [
            {
              path: "dashboard",
              element: (
                <ProtectedRoute role="patient">
                  <PatientDashboard />
                </ProtectedRoute>
              ),
            },
            {
              path: "find-doctors",
              element: (
                <ProtectedRoute role="patient">
                  <FindDoctors />
                </ProtectedRoute>
              ),
            },
            {
              path: "find-doctors/:id/select-time",
              element: (
                <ProtectedRoute role="patient">
                  <SelectTime />
                </ProtectedRoute>
              ),
            },
            {
              path: "doctor-profile/:id",
              element: (
                <ProtectedRoute role="patient">
                  <DoctorProfile />
                </ProtectedRoute>
              ),
            },
            {
              path: "select-time/:id",
              element: (
                <ProtectedRoute role="patient">
                  <SelectTime />
                </ProtectedRoute>
              ),
            },
            {
              path: "popular-doctors",
              element: (
                <ProtectedRoute role="patient">
                  <PopularDoctors />
                </ProtectedRoute>
              ),
            },
            {
              path: "popular-doctors/:id",
              element: (
                <ProtectedRoute role="patient">
                  <PopularDoctorProfile />
                </ProtectedRoute>
              ),
            },
            {
              path: "popular-doctors/:id/select-time",
              element: (
                <ProtectedRoute role="patient">
                  <SelectTime />
                </ProtectedRoute>
              ),
            },
            {
              path: "appointments",
              element: (
                <ProtectedRoute role="patient">
                  <PatientAppointments />
                </ProtectedRoute>
              ),
            },
            {
              path: "profile",
              element: (
                <ProtectedRoute role="patient">
                  <Profile />
                </ProtectedRoute>
              ),
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Vitrual;
