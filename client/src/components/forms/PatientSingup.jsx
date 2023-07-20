import React, { useState } from 'react'
import Input from '../ui/Input'
import { useFormik } from 'formik'
import PasswordInput from '../ui/PasswordInput'
import { validateSignupUser } from '../../Validations'
import api from '../../axios/axios'
import { useNavigate } from 'react-router-dom'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
const PatientSingup = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSucces] = useState(null)
  const { handleChange, handleBlur, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: 'patient',
      },
      validationSchema: validateSignupUser,
      onSubmit: (values, { resetForm }) => {
        setIsLoading(true)
        api
          .post('/api/auth/signup', values)
          .then((res) => {
            setIsLoading(false)
            resetForm({ values: '' })
            setError(null)
            setSucces(res.data.message)
            setTimeout(() => {
              navigate('/login')
            }, 1000)
          })
          .catch((err) => {
            setError(err.response.data.error)
            setIsLoading(false)
          })
      },
    })
  return (
    <form onSubmit={handleSubmit}>
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
      {error ? <p className="text-sm -mt-2 px-2 text-red-600">{error}</p> : ''}
      {success ? (
        <p className="text-sm -mt-2 px-2 text-green-600">{success}</p>
      ) : (
        ''
      )}
      <button
        type="submit"
        className="w-full bg-lightBlue py-3 rounded-sm text-white my-2 grid place-items-center"
        disabled={isLoading}
      >
        {isLoading ? (
          <AiOutlineLoading3Quarters className="text-xl font-medium animate-spin" />
        ) : (
          'Join'
        )}
      </button>
    </form>
  )
}

export default PatientSingup
