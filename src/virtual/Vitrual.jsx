import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from '../pages/Home'
import Layout from '../layout/Layout'
import FindDoctors from '../pages/FindDoctors'

const Vitrual = () => {
  const router = createBrowserRouter([
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
        }
      ]
    }
  ])  
  return (
    <RouterProvider router={router}/>
  )
}

export default Vitrual
