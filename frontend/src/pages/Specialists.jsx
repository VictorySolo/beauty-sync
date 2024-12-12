import React, { useContext, useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Specialists = () => {
  
  const { speciality } = useParams()

  const [filterSpecialist, setFilterSpecialist] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const navigate = useNavigate()

  const {beautySpecialists} = useContext(AppContext)

  const applyFilter = ()=> {
    if (speciality) {
      setFilterSpecialist(beautySpecialists.filter(s => s.speciality === speciality))
    } else {
      setFilterSpecialist(beautySpecialists)
    }
  }

  useEffect(()=> {
    applyFilter();
  },[beautySpecialists, speciality])

  return (
    <div>
      <p className='text-zinc-300'>Browse throug the specialists gategory.</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5 text-zinc-300'>
      <button onClick={() => setShowFilter(!showFilter)} className={`py-1 px-3 border rounded text-sm  transition-all sm:hidden ${showFilter ? 'bg-primary text-zinc-400' : ''}`}>Filters</button>
        <div className='flex flex-col gap-4 text-sm text-zinc-300'>
          <p onClick={()=> speciality === 'Hairdresser' ? navigate('/specialists') : navigate('/specialists/Hairdresser')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-zinc-600 rounded transition-all cursor-pointer ${speciality === "Hairdresser" ? "bg-lime-200 text-zinc-800" : ""}`}>Hairdresser</p>
          <p onClick={()=> speciality === 'Barber' ? navigate('/specialists') : navigate('/specialists/Barber')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-zinc-600 rounded transition-all cursor-pointer ${speciality === "Barber" ? "bg-zinc-800 text-zinc-300" : ""}`}>Barber</p>
          <p onClick={()=> speciality === 'Nail Master' ? navigate('/specialists') : navigate('/specialists/Nail Master')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-zinc-600 rounded transition-all cursor-pointer ${speciality === "Nail Master" ? "bg-zinc-800 text-zinc-300" : ""}`}>Nail Master</p>
          <p onClick={()=> speciality === 'Cosmetologist' ? navigate('/specialists') : navigate('/specialists/Cosmetologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-zinc-600 rounded transition-all cursor-pointer ${speciality === "Cosmetologist" ? "bg-zinc-800 text-zinc-300" : ""}`}>Cosmetologist</p>
        </div>
        <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
          {filterSpecialist.map((item,index)=>(
              <div onClick={()=>
              {navigate(`/appointment/${item._id}`);
               scrollTo(0, 0)}} 
               className='border border-lime-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
                <img className='bg-zinc-800' src={item.image} alt=""/>
                <div className='p-4'>
                  <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-lime-500' : 'text-zinc-500'}`}>
                    <p className={`w-2 h-2 rounded-full ${item.available ? 'bg-lime-500' : 'bg-zinc-500'}`}></p><p>{item.available ? 'Available' : 'Not Available'}</p>
                  </div>
                  <p className='text-zinc-300 text-lg font-medium'>{item.name}</p>
                  <p className='tex-zinc-600 text-sm '>{item.speciality}</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Specialists