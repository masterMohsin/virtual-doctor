import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from '../pages/Home'
import Layout from '../layout/Layout'
import FindDoctors from '../pages/FindDoctors'
import PopularDoctors from '../pages/PopularDoctors'
import SelectTime from '../pages/SelectTime'
import Appointements from '../pages/Appointements'
import Login from '../pages/Login'
import LoginSelection from '../pages/LoginSelection'
import DoctorTime from '../pages/DoctorTime'
import Profile from '../pages/Profile'
import DoctorProfile from '../pages/DoctorProfile'
import PopularDoctorProfile from '../pages/PopularDoctorProfile'
import AuthRedirect from '../components/AuthRedirect'
import ProtectedRoute from '../components/ProtectedRoute'
import Register from '../pages/Register'
import ForgotPassword from '../pages/ForgotPassword'

const Vitrual = () => {
  const router = createBrowserRouter([
    
    {
      path : '/login-selection',
      element : <LoginSelection/>
    },
    {
      path : '/login',
      element : <Login/>
    },
    {
      path : '/',
      element : <Layout/>,
      children : [
        {
          path : '/',
          element : <Home/>
        },
        
        
        {
          path : '/find-doctors',
          element : <FindDoctors/>
        },
        {
          path : '/find-doctors/:id/select-time',
          element : <SelectTime/>
        },
        {
          path : '/doctor-profile/:id',
          element : <DoctorProfile/>
        },
        {
          path : '/popular-doctors',
          element : <PopularDoctors/>
        },
        {
          path : '/popular-doctors/:id',
          element : <PopularDoctorProfile/>
        },
        {
          path : '/popular-doctors/:id/select-time',
          element : <SelectTime/>
        },
        {
          path : '/appointements',
          element : <Appointements/>
        },
        {
          path : '/doctor-time',
          element : <DoctorTime/>
        },
        {
          path : '/profile',
          element : <Profile/>
        }
        
      ],
    },
    {
          path : '/register',
          element : <Register/>
        },
    {
          path : '/forgot-password',
          element : <ForgotPassword/>
        },
      
  ])  
  return (
    <RouterProvider router={router}/>
  )
}

export default Vitrual
