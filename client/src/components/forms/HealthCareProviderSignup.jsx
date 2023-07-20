import React, { useState } from 'react'
import Input from '../ui/Input'
import { useFormik } from 'formik'
import PasswordInput from '../ui/PasswordInput'
import {
  validateSignupUser,
  ValidateSignupHealthCareProvider,
} from '../../Validations'

const HealthCareProviderSignup = () => {
  const [role, setRole] = useState('doctor')
  function handleRoleChange(e) {
    setRole(e.target.value)
  }
  const { handleChange, handleBlur, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        name: '',
      },
      validationSchema:
        role === 'doctor'
          ? validateSignupUser
          : ValidateSignupHealthCareProvider,
      onSubmit: () => {
        console.log(values)
      },
    })

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="email"
        label="Email Address"
        name="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        isTouched={touched.email}
        errorMsg={errors.email}
      />
      <PasswordInput
        name="password"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        isTouched={touched.password}
        errorMsg={errors.password}
      />
      <div className="border border-gray-200 px-2 rounded-md mb-4">
        <label htmlFor="type" className="text-gray-500">
          Role
        </label>
        <select
          name="provider-type"
          className="relative w-full mb-2 border-0 focus:ring-0 focus:outline-none focus:border-0  py-0 rounded-md"
          onChange={handleRoleChange}
        >
          <option value="doctor">Doctor</option>
          <option value="laboratory">Laboratory</option>
          <option value="medicalCentre">medical imaging center</option>
        </select>
      </div>
      {role === 'doctor' ? (
        <>
          <Input
            type="text"
            label="First Name"
            name="firstName"
            value={values.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            isTouched={touched.firstName}
            errorMsg={errors.firstName}
          />
          <Input
            type="text"
            label="Last Name"
            name="lastName"
            value={values.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            isTouched={touched.lastName}
            errorMsg={errors.lastName}
          />
        </>
      ) : (
        <Input
          type="text"
          label="Name"
          name="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          isTouched={touched.name}
          errorMsg={errors.name}
        />
      )}
      <button className="w-full bg-lightBlue py-3 rounded-sm text-white">
        Join
      </button>
    </form>
  )
}

export default HealthCareProviderSignup
