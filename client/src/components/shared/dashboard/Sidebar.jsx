import { NavLink } from 'react-router-dom'
import {
  BiSolidDashboard,
  BiSolidFolderOpen,
  BiSolidMessage,
  BiSolidCalendar,
} from 'react-icons/bi'
import { FaUserDoctor } from 'react-icons/fa6'
const Sidebar = ({ showSidebar, setShowSidebar }) => {
  return (
    <div
      className={
        showSidebar
          ? 'relative left-0 hidden lg:block w-[320px] space-y-40 p-6 min-h-screen border-r border-gray-200'
          : 'fixed -left-80 w-[320px] space-y-40 p-6 min-h-screen border-r border-gray-200'
      }
    >
      <div>
        <NavLink to={'/dashboard'}>
          <h1 className="text-2xl font-semibold tracking-wider">
            Medi<span className="text-primaryColor">link</span>
          </h1>
        </NavLink>
        <div className="text-gray-900 leading-none text-sm">Patient center</div>
      </div>
      <div>
        <div className="text-gray-500 text-sm">Main menu</div>
        <ul className="font-medium text-lg text-gray-800">
          <li className="py-3">
            <NavLink
              to={'/dashboard'}
              className={({ isActive }) =>
                isActive
                  ? 'flex items-center gap-2 text-lightBlue'
                  : 'flex items-center gap-2'
              }
            >
              <BiSolidDashboard />
              Dashboard
            </NavLink>
          </li>
          <li className="py-3">
            <NavLink
              to={'/dashboard/doctors'}
              className={({ isActive }) =>
                isActive
                  ? 'flex items-center gap-2 text-lightBlue'
                  : 'flex items-center gap-2'
              }
            >
              <FaUserDoctor />
              Find Doctors
            </NavLink>
          </li>
          <li className="py-3">
            <NavLink
              to={'/dashboard/medical-folder'}
              className={({ isActive }) =>
                isActive
                  ? 'flex items-center gap-2 text-lightBlue'
                  : 'flex items-center gap-2'
              }
            >
              <BiSolidFolderOpen />
              Medical folder
            </NavLink>
          </li>
          <li className="py-3">
            <NavLink
              to={'/dashboard/messages'}
              className={({ isActive }) =>
                isActive
                  ? 'flex items-center gap-2 text-lightBlue'
                  : 'flex items-center gap-2'
              }
            >
              <BiSolidMessage />
              Messages
            </NavLink>
          </li>
          <li className="py-3">
            <NavLink
              to={'/dashboard/appointments'}
              className={({ isActive }) =>
                isActive
                  ? 'flex items-center gap-2 text-lightBlue'
                  : 'flex items-center gap-2'
              }
            >
              <BiSolidCalendar />
              Appointments
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
