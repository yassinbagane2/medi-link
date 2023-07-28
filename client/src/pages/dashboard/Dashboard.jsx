import { Link } from 'react-router-dom'
import { FaCalendar, FaUserDoctor, FaMessage, FaPills } from 'react-icons/fa6'
import { IoMdSettings } from 'react-icons/io'
import { FaFileMedicalAlt } from 'react-icons/fa'
const navigations = [
  {
    name: 'Appointments',
    icon: <FaCalendar className="text-8xl text-darkerGray" />,
    link: 'dashboard/doctors',
  },
  {
    name: 'My doctors',
    icon: <FaUserDoctor className="text-8xl text-darkerGray" />,
    link: 'dashboard/doctors',
  },
  {
    name: 'Messages',
    icon: <FaMessage className="text-8xl text-darkerGray" />,
    link: 'dashboard/doctors',
  },
  {
    name: 'Metrics',
    icon: <FaFileMedicalAlt className="text-8xl text-darkerGray" />,
    link: 'dashboard/doctors',
  },
  {
    name: 'Pills',
    icon: <FaPills className="text-8xl text-darkerGray" />,
    link: 'dashboard/doctors',
  },
  {
    name: 'Settings',
    icon: <IoMdSettings className="text-8xl text-darkerGray" />,
    link: 'dashboard/doctors',
  },
]

const Dashboard = () => {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-y-20">
      {navigations.map((item, index) => {
        return (
          <Link
            key={index}
            to={item.link}
            className="flex flex-col items-center gap-y-2"
          >
            {item.icon}
            <div className="text-xl font-medium text-lightBlue">
              {item.name}
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default Dashboard
