import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
<<<<<<< HEAD
import Dashboard from '../pages/Dashboard'
=======
import Home from '../pages/Home'
import Layout from '../layout/Layout'
import FindDoctors from '../pages/FindDoctors'
>>>>>>> origin/mohsin

const Vitrual = () => {
  const router = createBrowserRouter([
    {
<<<<<<< HEAD
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
=======
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
        }
      ]
    }
  ])  
>>>>>>> origin/mohsin
  return (
    <RouterProvider router={router}/>
  )
}

export default Vitrual
