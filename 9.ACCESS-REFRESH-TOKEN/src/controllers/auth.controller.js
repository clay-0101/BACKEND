import userModel from "../models/user.model.js"
import bcrypt from 'bcrypt'
import { getAuthTokens } from "../utils/auth.utils.js"

const registerUserController = async (req, res) => {

    let { name, email, password } = req.body

    if (!name?.trim() === '' || !email?.trim() === '' || !password?.trim() === '') {
        return res.status(400).json({
            message: "All fields are required.."
        })
    }

    let isUserRegistered = await userModel.findOne({ email })

    if (isUserRegistered) {
        return res.status(400).json({
            message: "User already exists..",
            errors: {
                field: "email",
                message: "Email Already Exist.."
            }
        })
    }


    let user = await userModel.create({
        name,
        email,
        password: await bcrypt.hash(password, 10)
    })

    let { accessToken, refreshToken } = getAuthTokens(user._id)

    user.refreshToken = refreshToken
    await user.save()

    res.cookie("refreshToken", refreshToken, { httpOnly: true })

    res.status(201).json({
        message: "User Registered Successfully..",
        data: {
            user: {
                name: user.name,
                email: user.email
            },
            accessToken
        }
    })

}