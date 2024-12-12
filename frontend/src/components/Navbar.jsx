import React, { useState } from 'react'
import {assets} from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {

    const navigate = useNavigate()

    const [showMenu, setShowMenu] = useState(false)
    const [token, setToken, userData] = useState(true)

    const logout = () => {
        localStorage.removeItem('token')
        setToken(false)
        navigate('/login')
      }

  return (
    <div className='flex items-center justify-between text-sm text-slate-100 py-4 mb-5 mx-2 border-b border-b-zinc-600'>
        <img onClick={()=> navigate('/')} className='w-36 cursor-pointer px-2' src={assets.logo} alt=""/>
        <ul className='hidden md:flex items-start gap-5 font-medium'>
            <NavLink to='/'>
                <li className='py-1'>HOME</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
            </NavLink>
            <NavLink to='/specialists'>
                <li className='py-1'>ALL SPECIALISTS</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
            </NavLink>
            <NavLink to='/about'>
                <li className='py-1'>ABOUT</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
            </NavLink>
            <NavLink to='/contact'>
                <li className='py-1'>CONTACT</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
            </NavLink>
        </ul>
        <div className='flex items-center gap-4 px-2'>
            {
                token && userData
                ? <div className='flex items-center gap-2 cursor-pointer group relative'>
                    <img className='w-8 rounded-full' src={userData.image} alt="" />
                    <img className='w-2.5' src={assets.dropdown_icon} alt="" />
                    <div className='absolute top-0 right-0 pt-14 text-base font-medium text-white z-20 hidden group-hover:block'>
                        <div className='min-w-48 bg-zinc-800 rounded flex flex-col gap-4 p-4'>
                            <p onClick={()=>navigate('/my_profile')} className='hover:text-lime-200 cursor-pointer' >My Profile</p>
                            <p onClick={()=>navigate('/my_appointments')} className='hover:text-lime-200 cursor-pointer'>My Appointments</p>
                            <p onClick={logout} className='hover:text-lime-200 cursor-pointer'>Logout</p>
                        </div>
                    </div>
                </div>
                :<button onClick={()=>navigate('/login')} className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'>Create account</button>
            }
           <img onClick={() => setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="" /> 
        </div>
    </div>
  )
}

export default Navbar