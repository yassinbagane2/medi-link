import React, { useState } from 'react'
import Sidebar from '../shared/dashboard/Sidebar'
import Header from '../shared/dashboard/Header'
import { Outlet } from 'react-router-dom'
const DashboardLayout = () => {
  const [showSidebar, setShowSidebar] = useState(false)
  function toggleSidebar() {
    setShowSidebar(!showSidebar)
  }
  return (
    <div className="flex bg-lightGray min-h-screen">
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div className="flex flex-col w-full px-8 py-5">
        <Header toggleSidebar={toggleSidebar} />
        <div className="flex items-center justify-center p-10 min-h-[95%]">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout
