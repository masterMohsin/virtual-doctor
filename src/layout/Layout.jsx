import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

const Layout = () => {
  return (
    <>
      <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="md:w-72 min-h-screen fixed left-0 top-0 bottom-24 bg-white z-10">
        <Sidebar />
      </div>
      {/* Main Content */}
      <div className="flex-1 ml-72 flex flex-col min-h-screen overflow-auto">
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
