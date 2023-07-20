import React from 'react'
import { Link } from 'react-router-dom'
import { FaSquareFacebook, FaSquareInstagram } from 'react-icons/fa6'
const Footer = () => {
  return (
    <footer className="bg-gray-100 ">
      <div className="px-6 py-4 my-10 flex justify-between max-w-[1320px] mx-auto">
        <div>
          <h1 className="font-semibold text-xl">
            Medi<span className="text-primaryColor">link</span>
          </h1>
          <div className="py-3 text-gray-800">
            First professional healthcare plateform in Tunisia.
          </div>
        </div>
        <div>
          <h2 className="font-medium text-xl">What are you looking for?</h2>
          <ul className="flex flex-col gap-y-1 font-medium text-sm text-darkBlue">
            <li>
              <Link to="doctors">doctor</Link>
            </li>
            <li>
              <Link to="pharmacies">Pharmacy</Link>
            </li>
            <li>
              <Link to="laboratories">Laboratory</Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="font-medium text-xl">Other</h2>
          <ul className="flex flex-col gap-y-1 font-medium text-sm text-darkBlue">
            <li>
              <Link to="doctors">link</Link>
            </li>
            <li>
              <Link to="pharmacies">link</Link>
            </li>
            <li>
              <Link to="laboratories">link</Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="font-medium text-xl">Connect</h2>
          <div className="flex gap-2 text-4xl text-darkBlue">
            <FaSquareFacebook />
            <FaSquareInstagram />
          </div>
        </div>
      </div>
      <div className="bg-gray-200 text-center py-4 text-sm">
        all rights reserved &copy; 2023 Medi Link, Inc.
      </div>
    </footer>
  )
}

export default Footer
