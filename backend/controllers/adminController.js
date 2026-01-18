import doctorModel from '../models/doctorModel.js'
import bcrypt from 'bcrypt'
import { v2 as cloudinary } from 'cloudinary'
import validator from 'validator'
import jwt from 'jsonwebtoken'
import appointmentModel from '../models/appointmentModel.js'
import userModel from '../models/userModel.js'


// const addDoctor = async (req, res) => {
//   console.log("REQ BODY:", req.body);
//   try {
//     const {
//       name,
//       email,
//       password,
//       speciality,
//       degree,
//       experience,
//       about,
//       fees,
//       address
//     } = req.body

//     const imageFile = req.file

//     // 🔴 Required fields check
//     if (
//       !name || !email || !password || !speciality ||
//       !degree || !experience || !about || !fees ||
//       !address || !imageFile
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: "Missing required fields"
//       })
//     }

//     // 🔴 Email validation
//     if (!validator.isEmail(email.trim())) {
//       return res.status(400).json({
//         success: false,
//         message: "Please enter a valid email"
//       })
//     }

//     // 🔴 Password validation
//     if (password.length < 8) {
//       return res.status(400).json({
//         success: false,
//         message: "Password must be at least 8 characters long"
//       })
//     }

//     // ✅ Address handling (form-data safe)
//     let parsedAddress = address
//     if (typeof address === "string") {
//       parsedAddress = JSON.parse(address)
//     }

//     // ✅ Upload image to Cloudinary
//     const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
//       resource_type: "image"
//     })

//     // ✅ Hash password
//     const hashedPassword = await bcrypt.hash(password, 10)

//     // ✅ Save doctor (ONLY ONCE)
//     const doctor = await doctorModel.create({
//       name,
//       email,
//       password: hashedPassword,
//       image: imageUpload.secure_url,
//       speciality,
//       degree,
//       experience,
//       about,
//       fees,
//       address: parsedAddress,
//       available: true,
//       date: Date.now()
//     })

//     // 🔒 Remove password before sending response
//     // doctor.password = undefined

//     // ✅ Single clean response
//     // return res.status(201).json({
//     //   success: true,
//     //   message: "Doctor added successfully",
//     //   doctor
//     // })

//     const doctorData = doctor.toObject();
//     delete doctorData.password;

//     return res.status(201).json({
//       success: true,
//       message: "Doctor added successfully",
//       // doctor: doctorData
//     });


//   } catch (error) {
//     console.error("ADD DOCTOR ERROR:", error)
//     return res.status(500).json({
//       success: false,
//       message: error.message
//     })
//   }
// }


const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      experience,
      fees,
      about,
      speciality,
      degree,
      address
    } = req.body

    const imageFile = req.file

    if (!imageFile) {
      return res.status(400).json({
        success: false,
        message: "Image is required"
      })
    }

    if (
      !name || !email || !password || !experience ||
      !fees || !about || !speciality || !degree || !address
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      })
    }

    // ✅ SAFE address parsing
    let parsedAddress = address
    if (typeof address === "string") {
      parsedAddress = JSON.parse(address)
    }

    // upload image
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      folder: "doctors"
    })

    const hashedPassword = await bcrypt.hash(password, 10)

    const doctor = await doctorModel.create({
      name,
      email,
      password: hashedPassword,
      image: imageUpload.secure_url,
      experience,
      fees,
      about,
      speciality,
      degree,
      address: parsedAddress,
      available: true,
      date: Date.now()
    })

    // 🔒 remove password before sending
    const doctorData = doctor.toObject()
    delete doctorData.password

    return res.status(201).json({
      success: true,
      message: "Doctor added successfully",
      doctor: doctorData
    })

  } catch (error) {
    console.error("ADD DOCTOR ERROR:", error)
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}


// API for Admin Login

const loginAdmin = async (req, res) => {
  try{

    const {email, password} = req.body

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){

      // const token = jwt.sign(email+password, process.env.JWT_SECRET)
      const token = jwt.sign(
        { email },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      )
      
      res.json({success:true, token})

    } else {
      res.json({success: false, message: "Invalid credentials"})
    }

  } catch(error){
    console.error(error)
    res.json({success: false,message: error.message})
  }
}

const allDoctors = async (req, res) => {
  console.log("ALL DOCTORS API HIT")

  try {
    const doctors = await doctorModel.find({}).lean()

    console.log("DOCTORS COUNT:", doctors.length)

    return res.status(200).json({
      success: true,
      doctors
    })
  } catch (error) {
    console.error("ALL DOCTORS ERROR:", error)
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// API to get all appointments list

const appointmentsAdmin = async (req,res) => {
  try{
    const appointments = await appointmentModel.find({})
    res.json({success: true, appointments})
  } catch (error) {
    console.error("ALL DOCTORS ERROR:", error)
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// API to cancel appointment from admin pannel

const appointmentCancel = async (req, res) => {
    try{

        const {appointmentId} = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)

        await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled: true})

        const {docId, slotDate, slotTime} = appointmentData

        const doctorData = await doctorModel.findById(docId)

        let slots_booked = doctorData.slots_booked

        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)

        await doctorModel.findByIdAndUpdate(docId, {slots_booked})

        res.json({success: true, message: 'Appointment Cancelled'})

    } catch (error){
        console.error(error)
        res.json({ success: false, message: error.message })
    }
}

// API to display dashboard in admin panel

const adminDashboard = async(req, res) => {
  try{

    const doctors = await doctorModel.find({})
    const users = await userModel.find({})
    const appointments = await appointmentModel.find({})

    const dashData = {
      doctors: doctors.length,
      appointments: appointments.length,
      patients: users.length,
      latestAppointment: appointments.reverse().slice(0,5)
    }

    res.json({success: true, dashData})

  } catch (error){
        console.error(error)
        res.json({ success: false, message: error.message })
    }
}

export { addDoctor, loginAdmin, allDoctors, appointmentsAdmin, appointmentCancel, adminDashboard }