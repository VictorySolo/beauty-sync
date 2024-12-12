import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedSpecialists from '../components/RelatedSpecialists'

const Appointment = () => {

  const {specialistId} = useParams()
 
  const {beautySpecialists, currencySymbol} = useContext(AppContext)
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI']


  const [specInfo, setSpecInfo] = useState(null)
  const [specSlots, setSpecSlots] = useState([])
  const [slotIndex, setslotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')

  const fetchSpecInfo = async ()=> {
    const specInfo = await beautySpecialists.find(spec => spec._id === specialistId)
    setSpecInfo(specInfo)
    console.log(specInfo);
  }

  const getAvailableSlots = async () => {
    setSpecSlots([])

    // getting current date
    let today = new Date()

    for (let i = 0; i < 6; i++) {
      // getting date with index
      let currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)

      // settimng end time of the date with index
      let endTime = new Date()
      endTime.setDate(today.getDate() + i)
      endTime.setHours(21, 0, 0, 0)

        // setting hours
        if(today.getDate() === currentDate.getDate()) {
          currentDate.setHours(currentDate.getHours() > 9 ? currentDate.getHours() + 1 : 10)
          currentDate.setMinutes(currentDate.getMinutes() > 60 ? 60 : 0)
        } else {
          currentDate.setHours(9)
          currentDate.setMinutes(0)
        }

        let timeSlots = []

        while (currentDate < endTime){
          let formattedTime = currentDate.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
        
          // add slot to array
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime
          })
    
          // increment by 30 minutes
          currentDate.setMinutes(currentDate.getMinutes() + 60)
        }
        setSpecSlots(prev => ([...prev, timeSlots]))

      }
    }  
      

  useEffect(()=>{
    fetchSpecInfo()
  },[beautySpecialists, specialistId])

  useEffect(()=>{
    getAvailableSlots()
  },[specInfo])

  useEffect(()=>{
    console.log(specSlots);
    
  },[specSlots])

  if (!specInfo) {
    return <div className='text-white'>Loading...</div>; // Or a placeholder message
  }


 return specInfo && (
    <div>
        { /* ------- Specialist Details ------- */}
        <div className='flex flex-col sm:flex-row gap-4'>
          <div>
            <img className='bg-zinc-800 w-full sm:max-w-72 rounded-lg' src={specInfo.image || assets.logo} alt="" />
          </div>
        </div>
        <div className='flex-1 border border-zinc-600 rounded-lg p-8 py-7 bg-zinc-800 text-zinc-300 mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
          { /* ------- Specialist Info: name, degree, experience ------- */}
          <p className='flex items-center gap-2 text-2xl font-medium text-zinc-300'>
            {specInfo.name || "Specialist"}
            <img className='w-5' src={assets.verified_icon} alt="" />
          </p>
          <div className='flex items-center gap-2 text-sm mt-1 text-zinc-400'>
            <p>{specInfo.degree || "No degree available"} - {specInfo.speciality || "No speciality available"}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{specInfo.experience}</button>
          </div>
          { /* ------- Specialist About ------- */}
          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-zinc-300 mt-3'>
              About <img src={assets.info_icon} alt="" />
            </p>
            <p className='text-sm text-zinc-400 max-w-[700px] mt-1'>{specInfo.about}</p>
          </div>
          <p className='text-zinc-400 font-medium mt-4'>
            Service fee:<span className='text-zinc-300'> {currencySymbol}{specInfo.fees}</span></p>
        </div>

        { /* ------- Booking Slots ------- */}
        <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-zinc-400">
          <p>Booking Slots</p>
          <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
            {specSlots.length && specSlots.map((item, index)=>( 
               <div onClick={()=> setslotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border border-zinc-600'}`} key={index}>
               <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
               <p>{item[0] && item[0].datetime.getDay()}</p>
               </div>
            ))}
          </div>
          <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
            {specSlots.length && specSlots[slotIndex].map((item,index)=>( 
              <p onClick={()=>setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-black' : 'text-zinc-400 border border-zinc-300'}`} key={index}>
                {item.time.toLowerCase()}
              </p>
            ))}
          </div>
          <button className='bg-primary text-black text-sm font-light px-14 py-3 rounded-full my-6'>Book an appointment</button>
        </div>
        { /* ------- Listing Related Specialist ------- */}
        <RelatedSpecialists specId={specialistId} speciality={specInfo.speciality}/>
    </div>
  )
}

export default Appointment