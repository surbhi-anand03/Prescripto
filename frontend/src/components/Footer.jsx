import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            {/* ----Left--------- */}
            <div>
                <img className='mb-5 w-40' src={assets.logo} alt="" />
                <p className='w-full md:w-2/3 text-gray-850 leading-6'>Prescripto is your trusted healthcare companion, making it easy to find the right doctor and book appointments in just a few clicks. Patients can explore verified specialists, view real-time availability, and consult from the comfort of their home or visit clinics with confidence. Prescripto ensures a smooth, stress-free healthcare experience, putting your health and time first.</p>
            </div>

            {/* ----Center--------- */}
            <div>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-2 text-gray-700'>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Contact us</li>
                    <li>Privacy policy</li>
                </ul>
            </div>

            {/* ----Right--------- */}
            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-2 text-gray-700'>
                    <li>+0-000-000-000</li>
                    <li>prescripto@gmail.com</li>
                </ul>
            </div>
        </div>
        {/* ----------Copyright--------------- */}
        <hr />
        <p className='py-5 text-sm text-center'>Copyright 2026 @prescripto.web - All Right Reserved.</p>
    </div>
  )
}

export default Footer