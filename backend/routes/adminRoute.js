import express from 'express'
import { addDoctor, allDoctors, loginAdmin, appointmentsAdmin, appointmentCancel, adminDashboard } from '../controllers/adminController.js'
import upload from '../middlewares/multer.js'
import authAdmin from '../middlewares/authAdmin.js'
import { changeAvailability } from '../controllers/doctorController.js'

const adminRouter = express.Router()

// Test route (no auth)
adminRouter.post('/test', (req, res) => {
  res.json({ 
    message: 'Router working',
    headers: req.headers,
    hasToken: !!req.headers.atoken
  })
})

// Login route
adminRouter.post('/login', loginAdmin)

// All doctors route
adminRouter.post('/all-doctors', authAdmin, allDoctors)

// Add doctor route
adminRouter.post('/add-doctor', authAdmin, upload.single('image'), addDoctor)


adminRouter.post('/change-availability', authAdmin, changeAvailability)

adminRouter.get('/appointments', authAdmin, appointmentsAdmin)

adminRouter.post('/cancel-appointment', authAdmin, appointmentCancel)

adminRouter.get('/dashboard', authAdmin, adminDashboard)

export default adminRouter