import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'


const MyAppointments = () => {

  const { backendUrl, token } = useContext(AppContext)
 

  const [appointments, setAppointments] = useState([])
 

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Function to format the date eg. ( 05_12_2000 => 05 Dec 2000 )
  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_')
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
  }

  // Getting User Appointments Data 
  const getUserAppointments = async () => {
    try {
        const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })
        setAppointments(data.appointments.reverse())

    } catch (error) {
        console.log(error)
        toast.error(error.message)
    }
  }

  // Function to cancel appointment 
  const cancelAppointment = async (appointmentId) => {
    try {
        const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } })

        if (data.success) {
            toast.success(data.message)
            getUserAppointments()
        } else {
            toast.error(data.message)
        }
    } catch (error) {
        console.log(error)
        toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) {
        getUserAppointments()
    }
  }, [token])

  return (
    <div>
       <p className='pb-3 mt-12 text-lg font-medium text-zinc-600 border-b'>My appointments</p>
            <div className=''>
                {appointments.map((item, index) => (
                    <div key={index} className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4 border-b'>
                        <div>
                            <img className='w-36 bg-zinc-600' src={item.spec} alt="" />
                        </div>
                        <div className='flex-1 text-sm text-zinc-300'>
                            <p className='text-zinc-300 text-base font-semibold'>{item.userData.name}</p>
                            <p>{item.specData.speciality}</p>
                            <p className='text-zinc-400 font-medium mt-1'>Address:</p>
                            <p className=''>{item.specData.address.city}</p>
                            <p className=''>{item.specData.address.street}</p>
                            <p className=''>{item.specData.address.building}</p>
                            <p className=' mt-1'><span className='text-sm text-zinc-300 font-medium'>Date & Time:</span> {slotDateFormat(item.slotDate)} |  {item.slotTime}</p>
                        </div>
                        <div></div>
                        <div className='flex flex-col gap-2 justify-end text-sm text-center'>
                            {!item.cancelled && !item.isCompleted && <button onClick={() => cancelAppointment(item._id)} className='text-zinc-400 sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300'>Cancel appointment</button>}
                            {item.cancelled && !item.isCompleted && <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>Appointment cancelled</button>}
                        </div>
                    </div>
                ))}
            </div> 
    </div>
  )
}

export default MyAppointments