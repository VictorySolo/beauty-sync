import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const MyProfile = () => {

    const [isEdit, setIsEdit] = useState(false)

    const [image, setImage] = useState(false)

    const { token, backendUrl, userData, setUserData, loadUserProfileData } = useContext(AppContext)

   // Function to update user profile data 
    const updateUserProfileData = async () => {
        try {
            const formData = new FormData();

            formData.append('name', userData.name)
            formData.append('phone', userData.phone)
            formData.append('address', JSON.stringify(userData.address))
            formData.append('gender', userData.gender)
            formData.append('dob', userData.dob)

            image && formData.append('image', image)

            const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } })

            if (data.success) {
                toast.success(data.message)
                await loadUserProfileData()
                setIsEdit(false)
                setImage(false)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
      }

  return userData ? (
    <div className='max-w-lg flex flex-col gap-2 text-sm pt-5'>
      {isEdit
      ? <label htmlFor='image' >
          <div className='inline-block relative cursor-pointer'>
            <img className='w-36 rounded opacity-75' src={image ? URL.createObjectURL(image) : userData.image} alt="" />
            <img className='w-10 absolute bottom-12 right-12' src={image ? '' : assets.upload_icon} alt="" />
          </div>
         <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
        </label>
      : <img className='w-36 rounded' src={userData.image} alt="" />
      }
      {isEdit
         ? <input className='bg-zinc-800 text-3xl font-medium max-w-60 mt-4 text-zinc-300 border-zinc-400' type="text" value={userData.name} onChange={(e)=> setUserData((prev)=>({...prev,name:e.target.value}))} placeholder='Fill the name'/>
         : <p className='font-medium text-3xl text-zinc-300 mt-4'>{userData.name}</p>
      }
      <hr className='bg-primary h-[1px] border-none'/>
      <div>
          <p className='text-zinc-300 underline mt-3'>PERSONAL INFORMATION</p>
          <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-zinc-300 '>
            <p className='font-medium'>Email: </p>
            <p className='text-lime-500'>{userData.email}</p>
            <p className='font-medium'>Phone number: </p>
            {
              isEdit
              ? <input className='border bg-zinc-800 border-zinc-400 rounded max-w-52 p-2 mt-1' type="text" value={userData.phone} onChange={(e)=> setUserData((prev)=>({...prev,phone:e.target.value}))} placeholder='Phone number'/>
              : <p className='text-lime-500'>{userData.phone}</p>
            }
            <p className='font-medium'>Adress: </p>
            {
              isEdit
                 ? <p className='text-zinc-300'>
                    <input onChange={(e) => setUserData((prev)=> ({...prev, address: {...prev.address, city: e.target.value}}))} value={userData.address.city} className='border bg-zinc-800 border-zinc-400 rounded w-full p-2 mt-1' type="text" placeholder='City'/>
                    <br/>
                    <input onChange={(e) => setUserData((prev)=> ({...prev, address: {...prev.address, street: e.target.value}}))} value={userData.address.street} className='border bg-zinc-800 border-zinc-400 rounded w-full p-2 mt-1' type="text" placeholder='Street'/>
                    <br/>
                    <input onChange={(e) => setUserData((prev)=> ({...prev, address: {...prev.address, building: e.target.value}}))} value={userData.address.building} className='border bg-zinc-800 border-zinc-400 rounded w-full p-2 mt-1' type="text" placeholder='Building'/>
                  </p>
                 : <p className='text-zinc-300'>
                   <p>{userData.address.city}</p>
                    <br />
                    <p>{userData.address.street}</p>
                    <br />
                   <p>{userData.address.building}</p>
                  </p>
             }
          </div>
        </div>
        <div>
          <p className='text-zinc-300 underline mt-3'>BASIC INFORMATION</p>
           <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-zinc-500'>
            <p className='font-medium text-zinc-300'>Gender:</p>
          {isEdit
            ? <select className='max-w-20 bg-zinc-800 text-zinc-400 border rounded border-zinc-400' onChange={(e)=> setUserData((prev)=>({...prev, gender: e.target.value}))} value={userData.gender}>
                <option value="Not Selected">Not Selected</option>
                <option className='text-zinc-400' value="Male">Male</option>
                <option className='text-zinc-400' value="Female">Female</option>
              </select>
            : <p className='text-zinc-400'>{userData.gender}</p>
          }
          <p className='font-medium text-zinc-300'>Birthday:</p>
            {isEdit 
              ? <input className='max-w-28 bg-zinc-800 text-zinc-400 border rounded border-zinc-400' onChange={(e) => setUserData((prev)=> ({...prev, dob: e.target.value}))} value={userData.dob} type="date"/>
              : <p className='text-zinc-300'>{userData.dob}</p>
            }
        </div>
      </div>
      <div className='mt-10'>
        {
          isEdit 
          ? <button className='text-zinc-800 bg-primary w-full px-8 rounded-full py-2 mt-5 hover:bg-zinc-400 transition-all' onClick={updateUserProfileData}>Save</button>
          : <button className='text-zinc-800 bg-primary w-full rounded-full px-8 py-2 mt-5  hover:bg-zinc-400 transition-all' onClick={()=> setIsEdit(true)}>Edit</button>
        }
      </div>
    </div>
  ): null
}

export default MyProfile