import { createContext } from "react";
import axios from 'axios'
import { useState } from "react";
import { useEffect } from "react";
import {toast} from 'react-toastify'

export const AppContext = createContext()

const AppContextProvider = (props) => {


    const currencySymbol = '₹'
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    
    const [doctors, setDoctors] = useState([])
    // const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false)
    const [token, setToken] = useState(
        localStorage.getItem('token') || null
    );


    const [userData, setUserData] = useState(false)

    const getDoctorsData = async () => {
        try{

            const {data} = await axios.get(backendUrl + '/api/doctor/list')
            if (data.success){
                setDoctors(data.doctors)
            } else {
                toast.error(data.message)
            }

        } catch(error){
            console.log(error)
            toast.error(error.message)
        }
    }

    // const loadUserProfileData = async()=> {
    //     try{
    //         const {data} = await axios.get(backendUrl + '/api/user/get-profile', {headers: { Authorization: `Bearer ${token}`}})
    //         if (data.success){
    //             setUserData(data.userData)
    //         } else {
    //             toast.error(data.message)
    //         }
    //     } catch(error){
    //         console.log(error)
    //         toast.error(error.message)
    //     }
    // }

    const loadUserProfileData = async()=> {
    try{
        console.log('Making request to:', backendUrl + '/api/user/get-profile')
        console.log('Token:', token)
        
        const {data} = await axios.get(backendUrl + '/api/user/get-profile', {
            headers: { Authorization: `Bearer ${token}`}
        })
        
        if (data.success){
            setUserData(data.userData)
        } else {
            toast.error(data.message)
            // If user not found, clear the invalid token
            if (data.message === "User not found") {
                setToken(null)
                localStorage.removeItem('token')
            }
        }
    } catch(error){
        console.log(error)
        
        // If we get a 404, the user doesn't exist - clear token
        if (error.response?.status === 404) {
            console.log('User not found, clearing token')
            setToken(null)
            localStorage.removeItem('token')
            toast.error('Session expired. Please login again.')
        } else {
            toast.error(error.message)
        }
    }
}

    useEffect(() => {
        if (token) {
        localStorage.setItem("token", token);
        } else {
        localStorage.removeItem("token");
        }
    }, [token]);

    useEffect(() => {
        if (token) {
        loadUserProfileData()
        } else {
        setUserData(false)
        }
    }, [token]);

    const value = {
        doctors, getDoctorsData,
        currencySymbol,
        token, setToken,
        backendUrl,
        userData, setUserData,
        loadUserProfileData
    }

    useEffect(() => {
        getDoctorsData()
    },[])

    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider