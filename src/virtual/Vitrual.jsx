import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from '../pages/Home'
import Layout from '../layout/Layout'
import FindDoctors from '../pages/FindDoctors'
import PopularDoctors from '../pages/PopularDoctors'
import SelectTime from '../pages/SelectTime'

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
        },
        {
          path : '/find-doctors/:id/select-time',
          element : <SelectTime/>
        },
        {
          path : '/popular-doctors',
          element : <PopularDoctors/>
        },
        
      ]
    }
  ])  
  return (
    <RouterProvider router={router}/>
  )
}

export default Vitrual
