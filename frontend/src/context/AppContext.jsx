import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios'

export const AppContext = createContext()

const AppContextProvider = (props)=> {
    
    const currencySymbol = 'ש'
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [specialists, setSpecialists] = useState([])
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '')
    const [userData, setUserData] = useState(false)

   // Getting Specialists 
   const getSpecialistsData = async () => {

    try {

        const { data } = await axios.get(backendUrl + '/api/specialists/list')
        if (data.success) {
            setSpecialists(data.specialists)
        } else {
            toast.error(data.message)
        }

    } catch (error) {
        console.log(error)
        toast.error(error.message)
    }
}

// Getting User Profile 
const loadUserProfileData = async () => {

    try {

        const { data } = await axios.get(backendUrl + '/api/user/get-profile', { headers: { token } })

        if (data.success) {
            setUserData(data.userData)
        } else {
            toast.error(data.message)
        }

    } catch (error) {
        console.log(error)
        toast.error(error.message)
    }
}


useEffect(() => {
    getSpecialistsData()
}, [])

useEffect(() => {
    if (token) {
        loadUserProfileData()
    }
}, [token])

const value = {
    specialists, getSpecialistsData,
    currencySymbol,
    backendUrl,
    token, setToken,
    userData, setUserData, loadUserProfileData
}

    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;