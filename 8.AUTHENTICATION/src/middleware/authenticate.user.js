import jwt from 'jsonwebtoken'
import registerUserModel from '../model/user.model.js'

export const authenticate = async (req, res, next) => {

    let token = req.headers.authorization

    if (!token) {
        res.status(401).json({
            message: "Token not found..."
        })
    }

    const data = jwt.verify(token, process.env.JWT_SECRET)

    const user = await registerUserModel.findById(data.id)

    req.user = user

    next()
}