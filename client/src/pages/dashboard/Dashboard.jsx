import { Link } from 'react-router-dom'
import { FaCalendar, FaUserDoctor, FaMessage, FaPills } from 'react-icons/fa6'
import { IoMdSettings } from 'react-icons/io'
import { FaFileMedicalAlt } from 'react-icons/fa'
const navigations = [
  {
    name: 'Appointments',
    icon: <FaCalendar className="text-8xl text-darkerGray" />,
    link: 'appointments',
  },
  {
    name: 'My doctors',
    icon: <FaUserDoctor className="text-8xl text-darkerGray" />,
    link: 'my-doctors',
  },
  {
    name: 'Messages',
    icon: <FaMessage className="text-8xl text-darkerGray" />,
    link: 'messages',
  },
  {
    name: 'Metrics',
    icon: <FaFileMedicalAlt className="text-8xl text-darkerGray" />,
    link: 'metrics',
  },
  {
    name: 'Pills',
    icon: <FaPills className="text-8xl text-darkerGray" />,
    link: 'pills',
  },
  {
    name: 'Settings',
    icon: <IoMdSettings className="text-8xl text-darkerGray" />,
    link: 'settings',
  },
]

const Dashboard = () => {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 place-items-center h-full gap-y-14">
      {navigations.map((item, index) => {
        return (
          <Link key={index} to={item.link}>
            <div className="flex justify-center mb-4">{item.icon}</div>
            <div className="text-xl text-center font-medium text-lightBlue">
              {item.name}
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default Dashboard
