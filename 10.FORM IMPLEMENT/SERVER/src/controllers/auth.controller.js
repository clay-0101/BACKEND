import userModel from "../models/user.model.js"
import bcrypt from 'bcrypt'
import { getAuthTokens, verifyAccessToken, verifyRefreshToken } from "../utils/auth.utils.js"

export const registerUserController = async (req, res) => {

    try {
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
    } catch (error) {
        res.status(400).json({
            message: error
        })
    }

}

export const getMyData = async (req, res) => {

    let accessToken = req.headers.authorization?.split(" ")[1]

    if (!accessToken) {
        res.status(400).json({
            message: "Token not found"
        })
    }

    let decode = verifyAccessToken(accessToken)

    let user = await userModel.findById(decode.id)

    res.status(200).json({
        message: "User Fetched Successfully..",
        user: {
            name: user.name,
            email: user.email
        }

    })
}

export const getNewTokensController = async (req, res) => {

    let refreshToken = req.cookies.refreshToken

    if (!refreshToken) {
        res.status(400).json({
            message: "Token not found"
        })
    }

    let decode = verifyRefreshToken(refreshToken)

    let user = await userModel.findById(decode.id)

    if(refreshToken !== user.refreshToken){

        user.refreshToken = null
        await user.save()

        return res.status(401).json({
            message : "Unauthorize Refresh Token, mismatch"
        })
    }

    let {accessToken , refreshToken : newRefreshToken} = getAuthTokens(user._id)

    user.refreshToken = newRefreshToken
    await user.save()

    res.cookie("refreshToken", newRefreshToken, {httpOnly : true})

    res.status(200).json({
        message : "Tokens Updated Successfully...",
        data : {
            user :{
                name : user.name,
                email : user.email
            },
            accessToken
        }
    })

}

