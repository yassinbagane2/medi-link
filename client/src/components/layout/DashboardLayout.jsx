import React from 'react'
import Sidebar from '../shared/dashboard/Sidebar'
import Header from '../shared/dashboard/Header'
import { Outlet } from 'react-router-dom'
const DashboardLayout = () => {
  return (
    <div className="flex bg-lightGray min-h-screen">
      <Sidebar />
      <div className="flex flex-col w-full  px-8 py-5">
        <Header />
        <div className="flex items-center justify-center p-10 min-h-[95%]">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout
