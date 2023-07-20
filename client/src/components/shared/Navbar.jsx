import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="py-5 px-3 shadow-md">
      <div className="flex justify-between items-center max-w-[1320px] mx-auto">
        <div>
          <NavLink to="">
            <h1 className="text-2xl font-semibold tracking-wider">
              Medi<span className="text-primaryColor">link</span>
            </h1>
          </NavLink>
        </div>
        <div className="flex items-center gap-14 text-lg font-medium">
          <ul className="flex gap-10 ">
            <li>
              <NavLink
                to={''}
                className={({ isActive }) => {
                  return isActive ? 'text-primaryColor' : 'text-gray-800'
                }}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to={'about'}
                className={({ isActive }) => {
                  return isActive ? 'text-primaryColor' : 'text-gray-800'
                }}
              >
                How it works
              </NavLink>
            </li>
          </ul>
          <NavLink to={'login'}>
            <button className="border-2 border-lightBlue w-28 py-2 rounded-lg hover:bg-lightBlue hover:text-white">
              Login
            </button>
          </NavLink>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
