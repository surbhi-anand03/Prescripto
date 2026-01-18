// import express from 'express'

// import { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment, paymentRazorpay, verifyRazorpay } from '../controllers/userController.js'
// import authUser from '../middlewares/authUser.js'
// import upload from '../middlewares/multer.js'

// const useRouter = express.Router()

// useRouter.post('/register', registerUser)
// useRouter.post('/login', loginUser)
// useRouter.get('/get-profile', authUser ,getProfile)
// useRouter.post('/update-profile', authUser, upload.single('image'), updateProfile)
// useRouter.post('/book-appointment', authUser, bookAppointment)
// useRouter.get('/appointment', authUser, listAppointment)
// useRouter.post('/cancel-appointment', authUser, cancelAppointment)
// useRouter.post('/payment-razorpay', authUser, paymentRazorpay)
// useRouter.post('/verifyRazorpay', authUser, verifyRazorpay)

// export default useRouter

import express from 'express'
import { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment, paymentRazorpay, verifyRazorpay } from '../controllers/userController.js'
import authUser from '../middlewares/authUser.js'
import upload from '../middlewares/multer.js'

const useRouter = express.Router()

useRouter.post('/register', registerUser)
useRouter.post('/login', loginUser)
useRouter.get('/get-profile', authUser, getProfile)  // ✅ WITH authUser middleware
useRouter.post('/update-profile', authUser, upload.single('image'), updateProfile)
useRouter.post('/book-appointment', authUser, bookAppointment)
useRouter.get('/appointment', authUser, listAppointment)
useRouter.post('/cancel-appointment', authUser, cancelAppointment)
useRouter.post('/payment-razorpay', authUser, paymentRazorpay)
useRouter.post('/verifyRazorpay', authUser, verifyRazorpay)

export default useRouter