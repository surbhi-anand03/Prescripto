import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import useRouter from './routes/userRoute.js'

const app = express()
const port = process.env.PORT || 4000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// Add debugging middleware BEFORE routes
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
})

// api endpoint
app.use('/api/admin', adminRouter)
app.use('/api/doctor', doctorRouter)
app.use('/api/user', useRouter)

// Add this AFTER routes to catch 404s
app.use((req, res) => {
  console.log('❌ 404 - Route not found:', req.method, req.url)
  res.status(404).json({ 
    success: false, 
    message: `Route ${req.method} ${req.url} not found` 
  })
})

app.get('/',(req, res)=>{
    res.send('API Working.')
})

const startServer = async () => {
  try {
    await connectDB()
    connectCloudinary()

    app.listen(port, () => {
      console.log(`Server running on port ${port}`)
      console.log('Registered routes:')
      console.log('- /api/admin/*')
      console.log('- /api/doctor/*')
      console.log('- /api/user/*')
    })
  } catch (error) {
    console.error("Server failed to start:", error.message)
    process.exit(1)
  }
}

startServer()