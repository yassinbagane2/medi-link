import React from 'react'
import Select from '../../components/ui/Select'
import DoctorCard from '../../components/DoctorCard'
import { useQuery } from '@tanstack/react-query'

const Doctors = () => {
  const {} = useQuery({
    queryKey: ['doctors'],
    queryFn: async () => {
      
    }
  })
  return (
    <div>
      <div className="flex items-center justify-between w-full ">
        <div className="flex items-center">
          <div className="text-gray-500 text-sm">Total doctors: 50</div>
          <Select
            defaultValue="Speciality"
            optons={['Dentist', 'Psychologue']}
          />
        </div>
        <div>
          <input
            type="search"
            className="w-64 py-2 p-3 text-sm rounded-full border border-gray-200 focus:ring-lightBlue"
            placeholder="Search.."
          />
        </div>
      </div>
      <div className="mt-6 mx-10 flex flex-wrap gap-10">
        <DoctorCard
          name="Dr. Bagane Yassin"
          speciality="Dentist"
          university="Harvard university"
        />
        <DoctorCard
          name="Dr. Bagane Yassin"
          speciality="Dentist"
          university="Harvard university"
        />
        <DoctorCard
          name="Dr. Bagane Yassin"
          speciality="Dentist"
          university="Harvard university"
        />
      </div>
    </div>
  )
}

export default Doctors
