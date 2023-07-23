import { BiMenu } from 'react-icons/bi'
import { AiFillSetting } from 'react-icons/ai'
import { IoMdNotifications } from 'react-icons/io'
import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <div className="flex items-center justify-between px-8 py-5">
      <div className="flex items-center gap-3 text-gray-800">
        <BiMenu className="text-3xl hover:cursor-pointer" />
        <div className="text-xl font-semibold ">Dashboard</div>
      </div>
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-6 text-2xl text-gray-800">
          <button>
            <IoMdNotifications />
          </button>
          <button>
            <NavLink to={'/settings'}>
              <AiFillSetting />
            </NavLink>
          </button>
        </div>
        <div className="flex items-center gap-4 hover:cursor-pointer">
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
    </div>
  )
}

export default Header
