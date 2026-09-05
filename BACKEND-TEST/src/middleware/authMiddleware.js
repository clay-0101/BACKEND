import jwt from 'jsonwebtoken'
import { registerUserController } from '../controller/authController'

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

    let user = await registerUserController.findOne(data.id)

    req.user = user
    next()
}

export const isAdmin = async (req, res, next)=>{

    let {role} = req.user 
    
    if(role === 'admin'){
        next()
    }

    res.status(400).json({
        message : "Access Denied.."
    })
}