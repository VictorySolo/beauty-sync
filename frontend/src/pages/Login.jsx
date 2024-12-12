import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'


const Login = () => {

  const [state, setState] = useState('Sign Up')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const navigate = useNavigate()
  const { backendUrl, token, setToken } = useContext(AppContext)


  const onSubmitHandler = async (event) => {

    event.preventDefault();

    if (state === 'Sign Up') {

      const { data } = await axios.post(`${backendUrl}/api/user/register`, { name, email, password })

      if (data.success) {
        localStorage.setItem('token', data.token)
        setToken(data.token)
      } else {
        toast.error(data.message)
      }

    } else {

      const { data } = await axios.post(backendUrl + '/api/user/login', { email, password })

      if (data.success) {
        localStorage.setItem('token', data.token)
        setToken(data.token)
      } else {
        toast.error(data.message)
      }
    }}

    useEffect(() => {
      if (token) {
        navigate('/')
      }
    }, [token])

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-300 text-sm shadow-lg'>
        <p className='text-2xl font-semibold text-lime-300'>{state === 'Sign Up' ? 'Create Account' : 'Login'}</p>
        <p>Please {state === 'Sign Up' ? 'sign up' : 'log in'} to book appointment</p>
        {state === 'Sign Up'
          ? <div className='w-full'>
          <p>Full Name</p>
          <input className='border bg-zinc-300 border-zinc-400 rounded w-full p-2 mt-1 text-zinc-800' type="text" required onChange={(e)=> setName(e.target.value)} value={name} />
        </div>  
        : null 
        }
        
        <div className='w-full'>
          <p>Email</p>
          <input className='border bg-zinc-300 border-zinc-400 rounded w-full p-2 mt-1 text-zinc-800' type="email" onChange={(e)=> setEmail(e.target.value)} value={email} required/>
        </div>
        <div className='w-full'>
          <p>Password</p>
          <input className='border bg-zinc-300 border-zinc-400 rounded w-full p-2 mt-1 text-zinc-800' type="password" onChange={(e)=> setPassword(e.target.value)} value={password} required/>
        </div>
        <button className='bg-primary text-zinc-800 w-full py-2 rounded-md text-base'>{state === 'Sign Up' ? 'Create account' : 'Login'}</button>
        {
          state === 'Sign Up' 
            ? <p className='text-center mt-4'>Already have an account? <span className='text-primary underline cursor-pointer' onClick={()=> setState('Login')}>Login here</span></p>
            : <p className='text-center mt-4'>Create a new account? <span className='text-primary underline cursor-pointer' onClick={()=> setState('Sign Up')}>Click here</span></p>
        }
      </div>
        
    </form>
  )
}

export default Login