import React from 'react'

const Select = ({ optons, defaultValue }) => {
  return (
    <select
      className="py-1 mx-3 bg-gray-200 text-sm border-0 focus:ring-0 rounded-md shadow-sm"
      name="filter-doctors"
      id="filter-doctors"
    >
      <option value="" disabled selected>
        {defaultValue}
      </option>
      {optons?.map((option, i) => {
        return (
          <option key={i} value={option.value} className="hover:bg-none">
            {option}
          </option>
        )
      })}
    </select>
  )
}

export default Select
