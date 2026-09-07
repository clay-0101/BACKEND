import jwt from 'jsonwebtoken'
import userModel from '../models/user.model.js'

export const verifyToken = async(req, res, next) => {

    let token = req.headers.authorization

    if (!token) {
        return res.status(400).json({
            message: "Token Not Provided.."
        })
    }

    let data = jwt.verify(token, process.env.JWT_SECRET)

    if (!data) {
        return res.status(400).json({
            message: "Token Is Unauthorized.."
        })
    }

    let user = await userModel.findById(data.id)

    req.user = user
    next()
}

export const isAdmin = async (req, res, next)=>{

    let {role} = req.user 
    
    if(role === 'admin'){
      return  next()
    }

    res.status(400).json({
        message : "Access Denied.."
    })
}

