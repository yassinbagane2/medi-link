import React from 'react'
import { FaArrowLeft } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import Input from '../../components/ui/Input'

const ResetPassword = () => {
  return (
    <div className="flex items-center justify-center flex-col">
      <div className="w-[480px] p-3 mx-4 mt-10">
        <Link
          to="/login"
          className="flex items-center gap-2 mb-2 text-lightBlue underline"
        >
          <FaArrowLeft />
          Return to Login
        </Link>
        <div className="flex justify-between mb-3">
          <div className="text-2xl font-medium">Reset Password</div>
          <div>
            <div>Don't have an account?</div>
            <Link to="/join" className="text-primaryColor underline">
              Join Now
            </Link>
          </div>
        </div>
        <form>
          <Input label="Email Address" type="email" name="email" />
          <button
            type="submit"
            className="py-3 w-48 rounded-md bg-lightBlue hover:bg-lightBlue/90 text-white"
          >
            Reset
          </button>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword
