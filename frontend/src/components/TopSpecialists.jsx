import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const TopSpecialists = () => {
const navigate = useNavigate()
const{beautySpecialists} = useContext(AppContext)

  return (
    <div className='flex flex-col items-center gap-4 my-16 text-zinc-300 md:mx-10'>
       <h1 className='text-3xl font-medium'>Top Beauty Specialists to Book</h1> 
       <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of beauty specialist</p>
       <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
        {beautySpecialists.slice(0,10).map((item,index)=>(
            <div onClick={()=>{navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} className='border border-lime-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
              <img className='bg-zinc-800' src={item.image} alt=""/>
              <div className='p-4'>
                <div className='flex items-center gap-2 text-sm text-center text-lime-500'>
                  <p className='w-2 h-2 bg-lime-500 rounded-full'></p><p>Available</p>
                </div>
                <p className='text-zinc-300 text-lg font-medium'>{item.name}</p>
                <p className='tex-zinc-600 text-sm '>{item.speciality}</p>
              </div>
            </div>
          ))}
       </div>
       <button onClick={()=>{ navigate('/specialists'); scrollTo(0,0)}} className='bg-zinc-800 text-zinc-300 px-12 py-3 rounded-full mt-10'>more</button>

    </div>
  )
}

export default TopSpecialists