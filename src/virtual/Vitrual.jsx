import React from 'react'
// import Login from '../pages/Login'
import LoginSelection from '../pages/Login'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'

const Vitrual = () => {
  const router = createBrowserRouter([
    {
      path : '/login',
      element : <LoginSelection/>
    },
    {
      path : '/dashboard',
      element : <Dashboard/>
    },
    {
      path : '/dashboard',
      element : <Dashboard/>
    },
  ])
  return (
    <RouterProvider router={router}/>
  )
}

export default Vitrual
