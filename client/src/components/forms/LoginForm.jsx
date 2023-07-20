import { Link } from 'react-router-dom'
import Input from '../ui/Input'
import PasswordInput from '../ui/PasswordInput'
import { useFormik } from 'formik'
import { validateLogin } from '../../Validations'
import axios from '../../axios/axios'

const LoginForm = () => {
  const { handleChange, handleBlur, values, errors, touched, handleSubmit } =
    useFormik({
      initialValues: {
        email: '',
        password: '',
      },
      validationSchema: validateLogin,
      onSubmit: () => {
        axios
          .post('/api/auth/signup', values)
          .then((res) => {
            console.log(res)
          })
          .catch((err) => {
            console.log(err)
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
