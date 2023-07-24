import { AiFillSetting } from 'react-icons/ai'
import { IoMdNotifications, IoMdSettings } from 'react-icons/io'
import { IoClose } from 'react-icons/io5'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import {
  BiSolidDashboard,
  BiSolidFolderOpen,
  BiSolidMessage,
  BiSolidCalendar,
  BiMenu,
} from 'react-icons/bi'

const Header = ({ toggleSidebar }) => {
  const [showPopup, setShowPopup] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  function toggleMenu() {
    setShowMenu(!showMenu)
  }
  return (
    <div className="flex items-center justify-between">
      <div
        className={
          showMenu
            ? 'absolute left-8 top-[4.17rem] lg:hidden w-56 h-56 py-4 px-6 bg-transparentBlue/95 duration-200 ease-in'
            : 'absolute -left-80 top-[4.17rem] lg:hidden w-56 h-56 py-4 px-6 bg-transparentBlue/95 duration-200 ease-in'
        }
      >
        <ul className="text-white text-lg font-medium space-y-3">
          <li>
            <NavLink to="dashboard" className="flex items-center gap-2">
              <BiSolidDashboard />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="dashboard/medical-folder"
              className="flex items-center gap-2"
            >
              <BiSolidFolderOpen />
              Medical Folder
            </NavLink>
          </li>
          <li>
            <NavLink
              to="dashboard/messages"
              className="flex items-center gap-2"
            >
              <BiSolidMessage />
              Messages
            </NavLink>
          </li>
          <li>
            <NavLink
              to="dashboard/appointments"
              className="flex items-center gap-2"
            >
              <BiSolidCalendar />
              Appointments
            </NavLink>
          </li>
          <li>
            <NavLink
              to="dashboard/settings"
              className="flex items-center gap-2"
            >
              <IoMdSettings />
              Settings
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="flex items-center gap-3 text-gray-800">
        <BiMenu
          onClick={toggleSidebar}
          className="lg:block hidden text-3xl hover:cursor-pointer"
        />

        {showMenu ? (
          <div className="block lg:hidden bg-transparentBlue/95 rounded-t-md px-1 py-2 text-white">
            <IoClose onClick={toggleMenu} className="text-3xl font-extrabold" />
          </div>
        ) : (
          <div className="py-2 block lg:hidden">
            <BiMenu onClick={toggleMenu} className="text-3xl cursor-pointer" />
          </div>
        )}

        <div className="text-2xl font-bold ">Dashboard</div>
      </div>
      <div className="flex items-center gap-10">
        <div className="hidden lg:flex items-center gap-6 text-2xl text-gray-800">
          <button>
            <IoMdNotifications />
          </button>
          <button>
            <NavLink to={'/dashboard/account'}>
              <AiFillSetting />
            </NavLink>
          </button>
        </div>
        <div
          className="flex items-center gap-4 hover:cursor-pointer"
          onClick={() => setShowPopup(true)}
        >
          <img
            className="rounded-full h-10 w-10 object-cover"
            src="images/profile-img.avif"
            alt="your profile"
          />
          <div className="leading-3">
            <div className="font-semibold text-sm">Yassin Bagane &#9660;</div>
            <div className="text-sm ">yassin.bagane2@gmail.com</div>
          </div>
        </div>
      </div>
      {showPopup ? (
        <div
          className="fixed inset-0 w-full h-screen bg-black/30"
          onClick={(e) => {
            if (e.target.id === 'popup') {
              setShowPopup(false)
            }
          }}
          id="popup"
        >
          <div className="absolute right-16 top-10 h-20 w-36 p-3 bg-white rounded-md flex flex-col gap-y-3">
            <NavLink to="/dashboard/account">Account</NavLink>
            <NavLink to="/login">Logout</NavLink>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

export default Header
