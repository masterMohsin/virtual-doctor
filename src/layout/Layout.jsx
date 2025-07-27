import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

const Layout = () => {
  return (
    <>
      <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="md:w-56  min-h-screen   left-0 top-0 bottom-24  ">
        <Sidebar />
      </div>
      {/* Main Content */}
      <div className="flex-1 md:ml-10 w-full  flex  flex-col min-h-screen">
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
    </>
  )
}

export default Layout
