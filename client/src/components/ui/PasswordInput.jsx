import React, { useRef, useState } from 'react'
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs'

const PasswordInput = ({
  name,
  value,
  onChange,
  onBlur,
  errorMsg,
  isTouched,
}) => {
  const [isVisible, setIsVisible] = useState(false)
  function togglePassword() {
    setIsVisible(!isVisible)
  }
  return (
    <div
      className={
        isTouched && errorMsg
          ? 'relative border border-red-700 px-2 py-1 rounded-md mb-4'
          : 'relative border border-gray-200 px-2 py-1 rounded-md mb-4'
      }
    >
      <div className="flex justify-between">
        <label className="text-gray-500">Password</label>
        {isTouched && <div className="text-sm text-red-700">{errorMsg}</div>}
      </div>
      <input
        type={isVisible ? 'text' : 'password'}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        className="border-0 py-0 focus:ring-0 focus:outline-none w-full text-gray-900 font-medium"
      />
      {isVisible ? (
        <BsFillEyeSlashFill
          onClick={togglePassword}
          className="text-2xl text-gray-400 absolute right-3 top-6 cursor-pointer"
        />
      ) : (
        <BsFillEyeFill
          onClick={togglePassword}
          className="text-2xl text-gray-400 absolute right-3 top-5 cursor-pointer"
        />
      )}
    </div>
  )
}

export default PasswordInput
