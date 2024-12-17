import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Specialists from './pages/Specialists'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import MyProfile from './pages/MyProfile'
import MyAppointments from './pages/MyAppointments'
import Appointment from './pages/Appointment'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify';


const App = () => {
  return (
    <div className='mx-4 sm:mx-[100vh} bg-black'>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/specialists' element={<Specialists/>}/>
        <Route path='/specialists/:speciality' element={<Specialists/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/my_profile' element={<MyProfile/>}/>
        <Route path='/my_appointments' element={<MyAppointments/>}/>
        <Route path='/appointment/:specId' element={<Appointment/>}/>    
      </Routes>
      <Footer/>
    </div>
  )
}

export default App