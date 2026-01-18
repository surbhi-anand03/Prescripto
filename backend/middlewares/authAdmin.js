import jwt from 'jsonwebtoken'


const authAdmin = async (req, res, next) => {
  try {
    const atoken =
      req.headers.atoken ||
      req.headers.authorization?.split(' ')[1]

    console.log("TOKEN RECEIVED:", atoken)
    console.log("ALL HEADERS:", req.headers)

    if (!atoken) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized, Login again"
      })
    }

    const decoded = jwt.verify(atoken, process.env.JWT_SECRET)
    
    console.log("DECODED:", decoded)
    console.log("ADMIN EMAIL FROM ENV:", process.env.ADMIN_EMAIL)

    if (decoded.email !== process.env.ADMIN_EMAIL) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized, Login again"
      })
    }

    req.admin = decoded
    next()

  } catch (error) {
    console.error("AUTH ERROR:", error.message)
    return res.status(401).json({
      success: false,
      message: "Token invalid or expired"
    })
  }
}



// const authAdmin = async (req, res, next) => {
//   try {
//     const atoken =
//       req.headers.token ||
//       req.headers.atoken ||
//       req.headers.authorization?.split(' ')[1]

//     if (!token) {
//       return res.status(401).json({
//         success: false,
//         message: "Not Authorized, Login again"
//       })
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET)

//     if (decoded.email !== process.env.ADMIN_EMAIL) {
//       return res.status(401).json({
//         success: false,
//         message: "Not Authorized, Login again"
//       })
//     }

//     req.admin = decoded
//     next()
//   } catch (error) {
//     return res.status(401).json({
//       success: false,
//       message: "Token invalid or expired"
//     })
//   }
// }


export default authAdmin
