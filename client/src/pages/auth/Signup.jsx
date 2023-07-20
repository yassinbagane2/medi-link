import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import PatientSingup from '../../components/forms/PatientSingup'
import HealthCareProviderSignup from '../../components/forms/HealthCareProviderSignup'

const Signup = () => {
  const [type, setType] = useState('patient')
  function handleTypeChange(e) {
    setType(e.target.value)
  }
  return (
    <div className="flex items-center justify-center flex-col ">
      <div className="mt-10 w-[450px] p-3 mx-4">
        <div className="flex justify-between mb-3">
          <div className="text-2xl font-medium">Join</div>
          <div className="flex gap-2">
            <div>have an account?</div>
            <Link to="/login" className="text-primaryColor underline">
              Login
            </Link>
          </div>
        </div>
        <div className="flex gap-10 my-2">
          <div className="space-x-3">
            <input
              type="radio"
              name="type"
              value="patient"
              defaultChecked
              onChange={handleTypeChange}
            />
            <label htmlFor="patient">Patient</label>
          </div>
          <div className="space-x-3">
            <input
              type="radio"
              name="type"
              value="health-care"
              onChange={handleTypeChange}
            />
            <label htmlFor="health-care">Health care provider</label>
          </div>
        </div>
        {type === 'patient' ? <PatientSingup /> : <HealthCareProviderSignup />}
      </div>
    </div>
  )
}

export default Signup
