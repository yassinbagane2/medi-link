import { useRef } from 'react'

const Input = ({
  label,
  name,
  type,
  value,
  onChange,
  onBlur,
  isTouched,
  errorMsg,
}) => {
  const inputRef = useRef(null)
  return (
    <div
      className={
        isTouched && errorMsg
          ? 'border border-red-600 px-2 py-1 rounded-md mb-4'
          : 'border border-gray-200 px-2 py-1 rounded-md mb-4'
      }
      onClick={() => inputRef.current.focus()}
    >
      <div className="flex justify-between">
        <label className="text-gray-500">{label}</label>
        {isTouched && <div className="text-sm text-red-700">{errorMsg}</div>}
      </div>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        ref={inputRef}
        className="text-gray-900 py-0 font-medium border-0 focus:outline-none focus:ring-0 w-full"
        autoComplete={type === 'email' ? 'on' : 'off'}
      />
    </div>
  )
}

export default Input
