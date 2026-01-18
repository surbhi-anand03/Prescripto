// import jwt from 'jsonwebtoken'

// // User Authentcation middleware
// const authUser = async (req, res, next) => {
//   try {
//     const token =
//       req.headers.token ||
//       req.headers.authorization?.split(' ')[1]

//     console.log("TOKEN RECEIVED:", token)
//     console.log("ALL HEADERS:", req.headers)

//     if (!token) {
//       return res.status(401).json({
//         success: false,
//         message: "Not Authorized, Login again"
//       })
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
//     console.log("DECODED:", decoded)
//     console.log("ADMIN EMAIL FROM ENV:", process.env.ADMIN_EMAIL)

//     // if (decoded.email !== process.env.ADMIN_EMAIL) {
//     //   return res.status(401).json({
//     //     success: false,
//     //     message: "Not Authorized, Login again"
//     //   })
//     // }

//     // req.admin = decoded

//     // req.body.userId = decoded.id
//     req.user = {
//       id: decoded.id
//     }


//     next()

//   } catch (error) {
//     console.error("AUTH ERROR:", error.message)
//     return res.status(401).json({
//       success: false,
//       message: "Token invalid or expired"
//     })
//   }
// }



// // const authAdmin = async (req, res, next) => {
// //   try {
// //     const atoken =
// //       req.headers.token ||
// //       req.headers.atoken ||
// //       req.headers.authorization?.split(' ')[1]

// //     if (!token) {
// //       return res.status(401).json({
// //         success: false,
// //         message: "Not Authorized, Login again"
// //       })
// //     }

// //     const decoded = jwt.verify(token, process.env.JWT_SECRET)

// //     if (decoded.email !== process.env.ADMIN_EMAIL) {
// //       return res.status(401).json({
// //         success: false,
// //         message: "Not Authorized, Login again"
// //       })
// //     }

// //     req.admin = decoded
// //     next()
// //   } catch (error) {
// //     return res.status(401).json({
// //       success: false,
// //       message: "Token invalid or expired"
// //     })
// //   }
// // }


// export default authUser


import jwt from 'jsonwebtoken'

const authUser = async (req, res, next) => {
  try {
    const token =
      req.headers.authorization?.split(' ')[1] ||
      req.headers.token

    console.log("TOKEN RECEIVED:", token)

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized, Login again"
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
    console.log("DECODED:", decoded)

    req.user = {
      id: decoded.id
    }

    console.log("✅ req.user set:", req.user)  // Add this

    next()

  } catch (error) {
    console.error("AUTH ERROR:", error.message)
    return res.status(401).json({
      success: false,
      message: "Token invalid or expired"
    })
  }
}

export default authUser
