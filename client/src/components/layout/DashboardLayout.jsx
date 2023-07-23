import React from 'react'
import Sidebar from '../shared/dashboard/Sidebar'
import Header from '../shared/dashboard/Header'

const DashboardLayout = () => {
  return (
    <div className="flex bg-lightGray min-h-screen">
      <Sidebar />
      <div className="w-full">
        <Header />
      </div>
    </div>
  )
}

export default DashboardLayout
