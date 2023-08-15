import React from 'react'
import Button from '../components/ui/Button'

const DoctorCard = ({ id, name, speciality, university, img }) => {
  return (
    <div className="flex flex-col items-center py-3 w-60 h-[17.5rem] bg-white rounded-md shadow-md">
      <img
        src="/images/doctor-1.avif"
        className="rounded-full w-32 h-32 object-cover "
        alt="doctor"
      />
      <h3 className="mt-2 font-semibold text-gray-800">{name}</h3>
      <div className="text-sm text-gray-500">{speciality}</div>
      <div className="text-sm text-gray-500 mb-3">{university}</div>
      <Button>Profile</Button>
    </div>
  )
}

export default DoctorCard
