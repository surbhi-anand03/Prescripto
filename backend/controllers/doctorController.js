import doctorModel from "../models/doctorModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js"

const changeAvailability = async (req, res) => {
    try{

        const {docId} = req.body

        const docData = await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId, {available: !docData.available})

        res.json({success: true, message: 'Availability Changed'})

    } catch(error){
        console.error(error)
        res.json({success: false,message: error.message})
    }
}

const doctorList = async (req, res) => {
    try{
        const doctors = await doctorModel.find({}).select(['-password', '-email'])

        res.json({
            success: true,
            doctors
        })
    } catch (error){
        console.error(error)
        res.json({success: false,message: error.message})
    }
}

// Doctor Login

const loginDoctor = async(req, res) =>{
    try{

        const {email, password} = req.body
        const doctor = await doctorModel.findOne({email})

        if(!doctor){
            return res.json({success: false, message: 'Invalid credentials'})
        }

        const isMatch = await bcrypt.compare(password, doctor.password)

        if(isMatch){

            const token = jwt.sign({id:doctor._id}, process.env.JWT_SECRET)

            res.json({success: true, token})
        } else {
            res.json({success: false, message: 'Invalid credentials'})
        }

    }catch (error){
        console.error(error)
        res.json({success: false,message: error.message})
    }
}

const appointmentsDoctor = async(req, res) => {
    try{

        const docId = req.docId.id;
        const appointments = await appointmentModel.find({docId})

        res.json({ success: true, appointments })

    }catch (error){
        console.error(error)
        res.json({success: false,message: error.message})
    }
}

const appointmentCancel = async(req, res) => {
    try{
        const docId = req.docId.id
        const {appointmentId} = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)

        if(appointmentData && appointmentData.docId.toString() === docId){

            await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled: true})
            return res.json({success: true, message: 'Appointment Cancelled'})
        } else {
           return res.json({success: false, message: 'Cancellation Failed'}) 
        }

    } catch (error){
        console.error(error)
        res.json({success: false,message: error.message})
    }
}

const appointmentComplete = async(req, res) => {
    try{
        const docId = req.docId.id
        const { appointmentId} = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)

        if(appointmentData && appointmentData.docId.toString() === docId){

            await appointmentModel.findByIdAndUpdate(appointmentId, {isCompleted: true})
            return res.json({success: true, message: 'Appointment Completed'})
        } else {
           return res.json({success: false, message: 'Mark Failed'}) 
        }


    } catch (error){
        console.error(error)
        res.json({success: false,message: error.message})
    }
}

// Get Doctor Dashboard

const doctorDashboard = async (req, res) => {
    try{

        const docId = req.docId.id
        const appointments = await appointmentModel.find({docId})

        let earning = 0

        appointments.map((item)=> {
            if(item.isCompleted || item.payment){
                earning += Number(item.amount || 0)
            }
        })

        let patient =[]

        appointments.map((item) => {
            // if(patient.includes(item.userId)){
            //     patient.push(item.userId)
            // }
            if (!patient.includes(item.userId.toString())) {
                patient.push(item.userId.toString())
            }
        })
         

        const dashData ={
            earning,
            appointments: appointments.length,
            patients: patient.length,
            latestAppointments: appointments.reverse().slice(0,5)
        }

        res.json({success: true, dashData})

    } catch (error){
        console.error(error)
        res.json({success: false,message: error.message})
    }
}

const doctorProfile = async(req, res) => {

    try{

        const docId = req.docId.id
        const profileData = await doctorModel.findById(docId).select('-password')

        res.json({success: true, profileData})


    } catch (error){
        console.error(error)
        res.json({success: false,message: error.message})
    }

}

const updateDoctorProfile = async(req, res) => {

    try{
        const docId = req.docId.id
        const { fees, address, available} = req.body

        await doctorModel.findByIdAndUpdate(docId, {fees, address, available})

        res.json({success: true, message: 'Profile Updated'})

    } catch (error){
        console.error(error)
        res.json({success: false,message: error.message})
    }
}

export {
    changeAvailability, doctorList, 
    loginDoctor,
     appointmentsDoctor, appointmentCancel,
      appointmentComplete, doctorDashboard, 
      doctorProfile, updateDoctorProfile
}