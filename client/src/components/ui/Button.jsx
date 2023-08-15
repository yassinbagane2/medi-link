import React from 'react'

const Button = ({ type, children }) => {
  return (
    <button
      type={type || 'button'}
      className="text-center font-medium px-2 py-1 w-24 border rounded-md hover:bg-gray-100 transition-colors duration-150"
    >
      {children}
    </button>
  )
}

export default Button
