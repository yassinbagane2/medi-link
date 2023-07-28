import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../shared/Navbar'
import Footer from '../shared/Footer'

const Layout = () => {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <div>
        <Navbar />
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default Layout
