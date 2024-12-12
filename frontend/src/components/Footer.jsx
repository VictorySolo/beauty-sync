import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            {/* ------ Lefr Section ------ */}
            <div>
                <img className="w-20 mb-5" src={assets.logo} alt="logo" />
                <p className='w-full md:w-2/3 text-zinc-400 leading-6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo porro provident velit eveniet dolores maxime praesentium quidem enim, voluptates, possimus commodi illo laudantium esse qui totam sunt repudiandae, expedita quibusdam.</p>
            </div>
            {/* ------ Middle Section ------ */}
            <div>
                <p className='text-xl font-medium mb-5 text-zinc-400'>COMPANY</p>
                <ul className='flex flex-col gap-2 text-zinc-400'>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Contuct us</li>
                    <li>Privacy policy</li>
                </ul>
            </div>
            {/* ------ Right Section ------ */}
            <div>
                <p className='text-xl font-medium mb-5 text-zinc-400'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-2 text-zinc-400'>
                    <li>+972-053-412-9445</li>
                    <li>info@beautysync.co.il</li>
                </ul>
            </div>
        </div>
        <div>
            {/* ----- Copyriting Text ----- */}
            <p className='py-5 text-sm text-center text-zinc-400'>Copyright 2024© Beauty Sync - All Right Reserved.</p>
        </div>
    </div>
  )
}

export default Footer