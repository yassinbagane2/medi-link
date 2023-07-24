import { Link } from 'react-router-dom'
import Input from '../ui/Input'
import PasswordInput from '../ui/PasswordInput'
import { useFormik } from 'formik'
import { validateLogin } from '../../Validations'
import api from '../../axios/axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const LoginForm = () => {
  const navigate = useNavigate()
  const [error, setError] = useState(null)
  const {
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validateLogin,
    onSubmit: (values, { resetForm }) => {
      api
        .post('/api/auth/login', values)
        .then((res) => {
          console.log(res)
          navigate('/dashboard')
          // save the recived token & state in redux store then navigate the user to the role screen
        })
        .catch((err) => {
          setError(err.response.data.message)
          resetForm({ values: '' })
        })
    },
  })

  return (
    <form className="w-[450px] p-3 mx-4 mt-10" onSubmit={handleSubmit}>
      <div className="flex justify-between mb-3">
        <div className="text-2xl font-medium">Login</div>
        <div>
          <div>Don't have an account?</div>
          <Link to="/join" className="text-primaryColor underline">
            Join Now
          </Link>
        </div>
      </div>
      <Input
        label="Email Address"
        name="email"
        type="email"
        isTouched={touched.email}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.email}
        errorMsg={errors.email}
      />
      <PasswordInput
        name="password"
        isTouched={touched.password}
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        errorMsg={errors.password}
      />
      {error && <p className="-mt-2 mb-2 px-2 text-red-600 text-sm">{error}</p>}
      <button
        type="submit"
        className="py-3 w-48 rounded-md bg-lightBlue hover:bg-lightBlue/90 text-white"
      >
        Login
      </button>
      <div className="mt-2 text-gray-800">
        Forgot password?{' '}
        <Link
          to="/reset"
          className="text-primaryColor block underline font-medium"
        >
          Reset Password
        </Link>
      </div>
    </form>
  )
}

export default LoginForm
