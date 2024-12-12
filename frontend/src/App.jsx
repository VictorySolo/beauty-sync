import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import MyProfile from './pages/MyProfile'
import MyAppointments from './pages/MyAppointments'
import Specialists from './pages/Specialists'
import Appointment from './pages/Appointment'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const App = () => {
  return (
    <div className='mx-4 sm:mx-[100vh} bg-black'>
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
        <Route path='/appointment/:specialistId' element={<Appointment/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App