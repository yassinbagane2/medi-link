import { Link } from 'react-router-dom'
import { RiMessage2Line } from 'react-icons/ri'
const Doctors = () => {
  return (
    <>
      <div className="flex items-center justify-center min-h-full">
        <div className="w-[40rem] min-h-[10rem] bg-white shadow-sm p-4">
          <h1 className="border-b pb-2 font-medium text-gray-800">
            Here is a list of doctors you have connected with:
          </h1>
          <div className="flex justify-between items-center w-full rounded-md h-16 bg-lightGray shadow-sm mt-3 p-2">
            <div className="flex gap-2">
              <img
                src="/images/doctor-1.avif"
                className="object-fill w-12 aspect-square rounded-sm"
                alt="doctor"
              />
              <div>
                <div className="font-semibold">Yassin bagane</div>
                <p>Dentist</p>
              </div>
            </div>
            <div className="flex gap-2 text-gray-800 font-medium">
              <button className="flex items-center gap-2 px-2 py-1 w-20 border rounded-md">
                <RiMessage2Line />
                Chat
              </button>
              <button className="text-center px-2 py-1 w-20 border rounded-md">
                Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      <p className="hidden items-center justify-center min-h-full text-gray-800 text-sm">
        It looks like you haven't connected with any doctor.
        <Link to="/dashboard/doctors" className="underline text-lightBlue mx-1">
          Find a doctor
        </Link>
      </p>
    </>
  )
}

export default Doctors
