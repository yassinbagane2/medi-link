import { Link } from 'react-router-dom'
const Dashboard = () => {
  return (
    <div className="p-4 w-full rounded-md bg-white min-h-full">
      <div className="flex justify-between">
        <div>
          <div className="font-semibold text-xl">Hi, Yassin !</div>
          <p className="text-gray-500">How do you feel today?</p>
          <div className="mt-3">
            <div className="font-semibold text-xl">Upcoming appointments</div>
            <p>
              No upcoming appointments.{' '}
              <Link
                to={'/dashboard/appointments'}
                className="text-lightBlue underline"
              >
                Make one
              </Link>
            </p>
          </div>
        </div>
        <div className="h-80 overflow-y-scroll hidden-scroll rounded-md bg-gray-50 w-60 p-3">
          <div className="font-medium text-sm">Followed doctors</div>
          <div className="flex gap-2 pt-3">
            <div className="relative">
              <img
                src="/images/doctor-1.avif"
                className="w-10 h-10 rounded-full object-cover"
                alt="doctor"
              />
              <div className="absolute bottom-0 w-3 h-3 bg-green-600 rounded-full"></div>
            </div>
            <div>
              <Link
                to="/dashboard/doctor/profile"
                className="font-bold text-sm"
              >
                Youssef MAKNI
              </Link>
              <div className="leading-3 text-gray-500 text-xs">Psychologue</div>
            </div>
          </div>
          <div className="flex gap-2 pt-3">
            <div className="relative">
              <img
                src="/images/doctor-2.avif"
                className="w-10 h-10 rounded-full object-cover"
                alt="doctor"
              />
              <div className="absolute bottom-0 w-3 h-3 bg-green-600 rounded-full"></div>
            </div>
            <div>
              <Link
                to="/dashboard/doctor/profile"
                className="font-bold text-sm"
              >
                Rania soufi
              </Link>
              <div className="leading-3 text-gray-500 text-xs">Dentiste</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
