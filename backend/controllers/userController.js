import Validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../models/doctorModel.js';
import appointmentModel from '../models/appointmentModel.js';

import Razorpay  from 'razorpay'

// API to register user

const registerUser = async(req, res) => {

    try {

        const { name, email, password} = req.body;

        if( !name || !password || !email){
            return res.json({success: false, message: "Missing Details"});
        }

        if (!Validator.isEmail(email)){
            return res.json({success: false, message: "Ener valid Email"});
        }

        if(password.length < 8){
            return res.json({success: false, message: "Enter Strong Passwprd"});
        }

        // Hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData={
            name, email, password: hashedPassword
        }

        const newUser = new  userModel(userData)

        const user = await newUser.save()

        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)

        res.json({success: true, token})


    } catch (error){
        console.error(error)
        res.json({success: false,message: error.message})
    }
}



// API for user LOgin

const loginUser = async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await userModel.findOne({email})
        
        if (!user){
            return res.json({success: false,message: "User doesn't exist."})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(isMatch){
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
            res.json({success: true, token})
        } else {
            res.json({success: false, message: "Invalid credentials"})
        }

    } catch(error){
        console.error(error)
        res.json({success: false,message: error.message})
    }
}

// API to get user profile data

// const getProfile = async(req, res) => {
//     try{
//         const userId = req.user?.id
//         const userData = await userModel.findById(userId).select('-password')
//         if (!userData) {
//             return res.status(404).json({
//                 success: false,
//                 message: "User not found"
//         })
// }


//         res.json({success: true, userData})
//     } catch(error){
//         console.error(error)
//         res.json({success: false,message: error.message})
//     }
// }

const getProfile = async(req, res) => {
    try{
        const userId = req.user?.id
        
        console.log("Getting profile for user:", userId)
        
        if (!userId) {
            console.log("❌ No userId found")
            return res.status(401).json({
                success: false,
                message: "User ID not found"
            })
        }
        
        const userData = await userModel.findById(userId).select('-password')
        
        console.log("userData query result:", userData)
        
        if (!userData) {
            console.log("❌ User not found in database")
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        console.log("✅ Sending success response for user:", userData.name)
        return res.json({success: true, userData})
        
    } catch(error){
        console.error("❌ GET PROFILE ERROR:", error)
        return res.status(500).json({success: false, message: error.message})
    }
}

// API to update user profile

const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id
    const { name, phone, address, dob, gender } = req.body
    const imageFile = req.file

    if (!name || !phone || !address || !dob || !gender) {
      return res.json({ success: false, message: "Data Missing" })
    }

    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address: JSON.parse(address),
      dob,
      gender
    })

    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(
        imageFile.path,
        { folder: "users" }
      )

      await userModel.findByIdAndUpdate(userId, {
        image: imageUpload.secure_url
      })
    }

    res.json({ success: true, message: "Profile Updated" })

  } catch (error) {
    console.error(error)
    res.json({ success: false, message: error.message })
  }
}

// API to book appointment

const bookAppointment = async (req, res) => {
    try {
        // const {userId, docId, slotDate, slotTime} = req.body
        const userId = req.user.id
        const { docId, slotDate, slotTime } = req.body

        const docData = await doctorModel.findById(docId).select('-password')

        if (!docData.available){
            return res.json({ success: false, message: 'Doctor not Available'})
        }

        let slots_booked = docData.slots_booked

        // Ckecking slots availability
        if(slots_booked[slotDate]){
            if(slots_booked[slotDate].includes(slotTime)){
                return res.json({success: false, message: 'Slots not Available'})
            } else {
                slots_booked[slotDate].push(slotTime)
            }
        } else {
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }

    const userData = await userModel.findById(userId).select('-password')        

    delete docData.slots_booked

    const appointmentData = {
        userId, docId, userData, docData,
        amount: docData.fees,
        slotTime, slotDate,
        date: Date.now()
    }

    const newAppointment = new appointmentModel(appointmentData)
    await newAppointment.save()

    // Save new slots data in DocData

    await doctorModel.findByIdAndUpdate(docId, {slots_booked})

    res.json({success: true, message: 'Appointment Booked'})

    } catch (error){
        console.error(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get user appointment for frntend

const listAppointment = async (req, res) => {
    try{
        const userId = req.user.id
        const appointments = await appointmentModel.find({userId})

        res.json({success: true, appointments})
    } catch (error){
        console.error(error)
        res.json({ success: false, message: error.message })
    }
}

// API to cancel Appointment
const cancelAppointment = async (req, res) => {
    try{

        const userId = req.user.id
        const {appointmentId} = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)

        // Verify Appointment users
        if(appointmentData.userId !== userId){
            return res.json({success: false, message: 'Unauthorized Action..'})
        }

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

const razorPayInstant = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})


const paymentRazorpay = async (req, res) => {
  try {
    const { appointmentId } = req.body

    const appointmentData = await appointmentModel.findById(appointmentId)

    if (!appointmentData || appointmentData.cancelled) {
      return res.json({
        success: false,
        message: "Appointment cancelled or not found"
      })
    }

    const options = {
      amount: appointmentData.amount * 100, // paise
      currency: process.env.CURRENCY,
      receipt: appointmentId.toString(), // ✅ FIXED spelling
    }

    const order = await razorPayInstant.orders.create(options)

    res.json({
      success: true,
      order
    })

  } catch (error) {
    console.error("RAZORPAY ERROR:", error)
    res.status(500).json({
      success: false,
      message: error.error?.description || error.message
    })
  }
}

// API to verify payment 

const verifyRazorpay = async(req, res) => {
    try{
        const {razorpay_order_id} = req.body
        const orderInfo = await razorPayInstant.orders.fetch(razorpay_order_id)

        // console.log(orderInfo)
        if (orderInfo.status === 'paid'){
            await appointmentModel.findByIdAndUpdate(orderInfo.receipt, {payment: true})
            res.json({success: true, message: "Payment Successful"})
        } else {
            res.json({success: false, message: "Payment Failed"})
        }


    } catch(error){
        console.error(error)
        res.json({success: false, message: error.message})
    }
}

export {registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment, paymentRazorpay, verifyRazorpay}