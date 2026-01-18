import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctor from '../components/RelatedDoctor'
import { toast } from 'react-toastify'
import axios from 'axios'

const Appointment = () => {
  const {docId} = useParams()
  const {doctors,currencySymbol, backendUrl, token, getDoctorsData} = useContext(AppContext)
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']


  const navigate = useNavigate()

  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')

  const fetchDocInfo = async() => {
    const docInfo = doctors.find(doc => doc._id === docId)
    setDocInfo(docInfo)
  }


const getAvailableSlots = async () => {
  setDocSlots([])

  let today = new Date()

  for (let i = 0; i < 7; i++) {
    let currentDate = new Date(today)
    currentDate.setDate(today.getDate() + i)

    let endTime = new Date(currentDate)
    endTime.setHours(19, 0, 0, 0)

    if (today.toDateString() === currentDate.toDateString()) {
      currentDate.setHours(Math.max(currentDate.getHours() + 1, 10))
      currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
    } else {
      currentDate.setHours(10, 0, 0, 0)
    }

    let timeSlots = []

    while (currentDate < endTime) {
      let formattedTime = currentDate.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })

      let day = currentDate.getDate()
      let month = currentDate.getMonth() + 1
      let year = currentDate.getFullYear()

      const slotDate = `${day}_${month}_${year}`
      const slotTime = formattedTime

      const isSlotAvailable =
        !docInfo.slots_booked?.[slotDate]?.includes(slotTime)

      if (isSlotAvailable) {
        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        })
      }

      currentDate.setMinutes(currentDate.getMinutes() + 60)
    }

    setDocSlots(prev => [...prev, timeSlots])
  }
}



  const bookAppointment = async () => {
    if(!token) {
      toast.warn('Login to Book Appointment')
      return navigate('/login')
    }
    try {
      const date = docSlots[slotIndex][0].datetime

      let day = date.getDate()
      let month = date.getMonth()+1
      let year = date.getFullYear()

      const slotDate = day + "_" + month + "_" + year

      const { data } = await axios.post(backendUrl + '/api/user/book-appointment', {docId, slotDate, slotTime}, {headers: {token}})
      if(data.success){
        toast.success(data.message)
        getDoctorsData()
        navigate('/my-appointment')
      } else {
        toast.error(data.message)
      }
      // console.log(slotDate)

    } catch (error){
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(()=> {
    fetchDocInfo()
  },[doctors, docId])

  // useEffect( ()=>{
  //   getAvailableSlots()
  // },[docInfo])

  useEffect(() => {
      if (docInfo) {
        getAvailableSlots()
      }
    }, [docInfo])

  useEffect(()=>{
    console.log(docSlots);
  },[docSlots])
  
  return docInfo && (
  <div className="max-w-6xl mx-auto px-4">

    {/* -------- Doctor Section (GRID) -------- */}
    <div className="grid grid-cols-1 sm:grid-cols-[300px_1fr] gap-6">

      {/* Doctor Image */}
      <div>
        <img
          className="bg-primary w-full rounded-lg"
          src={docInfo.image}
          alt=""
        />
      </div>

      {/* Doctor Info */}
      <div className="border border-gray-300 rounded-lg p-8 bg-white">
        <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
          {docInfo.name}
          <img className="w-5" src={assets.verified_icon} alt="" />
        </p>

        <div className="flex items-center gap-2 text-md my-1 text-gray-600">
          <p>{docInfo.degree} - {docInfo.speciality}</p>
          <span className="px-2 py-0.5 border rounded-full text-sm">
            {docInfo.experience}
          </span>
        </div>

        <div className="mt-3">
          <p className="flex items-center gap-1 text-sm font-medium text-gray-900">
            About
            <img src={assets.info_icon} alt="" />
          </p>
          <p className="text-sm text-gray-500 mt-1 max-w-[700px]">
            {docInfo.about}
          </p>
        </div>

        <p className="text-gray-500 font-semibold mt-4">
          Appointment fee:
          <span className="text-gray-600"> {currencySymbol}{docInfo.fees}</span>
        </p>
      </div>
    </div>

    {/* -------- Booking Slots (START FROM COL 2) -------- */}
    <div className="grid grid-cols-1 sm:grid-cols-[300px_1fr] mt-10">
      <div /> {/* empty column under image */}

      <div className="font-medium text-gray-700">
        <p className="text-lg mb-4">Booking slots</p>

        {/* Days */}
        <div className="flex gap-3 overflow-x-auto pb-2">
          {docSlots.map((item, index) => (
            <div
              key={index}
              onClick={() => setSlotIndex(index)}
              className={`text-center py-4 min-w-16 rounded-full cursor-pointer
                ${slotIndex === index
                  ? 'bg-primary text-white'
                  : 'border border-gray-200'
                }`}
            >
              <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
              <p>{item[0] && item[0].datetime.getDate()}</p>
            </div>
          ))}
        </div>

        {/* Time Slots */}
        <div className="flex gap-3 overflow-x-auto mt-4">
          {docSlots[slotIndex]?.map((item, index) => (
            <p
              key={index}
              onClick={() => setSlotTime(item.time)}
              className={`px-5 py-2 rounded-full text-sm cursor-pointer transition
                ${
                  slotTime === item.time
                    ? 'bg-primary text-white'
                    : 'border border-gray-300 text-gray-600 hover:bg-primary hover:text-white'
                }`}
            >
              {item.time.toLowerCase()}
            </p>
          ))}
        </div>
        {/* <button onClick={bookAppointment} className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6'>Book an Appointment</button> */}
      
      <button
  onClick={bookAppointment}
  disabled={!slotTime || !docSlots[slotIndex]?.length}
  className={`bg-primary text-white text-sm px-14 py-3 rounded-full my-6
    ${(!slotTime || !docSlots[slotIndex]?.length) && 'opacity-50 cursor-not-allowed'}
  `}
>
  Book an Appointment
</button>

      </div>
      {/* Listing related doctors */}

    </div>
      <RelatedDoctor docId={docId} speciality={docInfo.speciality}/>

  </div>
)

}

export default Appointment