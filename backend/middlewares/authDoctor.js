import jwt from 'jsonwebtoken'

// Doctor Authentcation middleware
const authDoctor = async (req, res, next) => {
  try {
    const dtoken =
      req.headers.dtoken ||
      req.headers.authorization?.split(' ')[1]

    console.log("TOKEN RECEIVED:", dtoken)
    console.log("ALL HEADERS:", req.headers)

    if (!dtoken) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized, Login again"
      })
    }

    const decoded = jwt.verify(dtoken, process.env.JWT_SECRET)
    
    console.log("DECODED:", decoded)
    console.log("ADMIN EMAIL FROM ENV:", process.env.ADMIN_EMAIL)

    req.docId = {
      id: decoded.id
    }


    next()

  } catch (error) {
    console.error("AUTH ERROR:", error.message)
    return res.status(401).json({
      success: false,
      message: "Token invalid or expired"
    })
  }
}


export default authDoctor
