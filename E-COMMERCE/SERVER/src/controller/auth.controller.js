import userModel from "../models/auth.model.js"
import bcrypt from 'bcrypt'
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../utils/app.utils.js"


export const registerUserController = async (req, res) => {

    try {
        let { name, email, password } = req.body

        let isAlreadyRegistered = await userModel.findOne({ email })

        if (isAlreadyRegistered) {
            return res.status(409).json({
                message: "Email already registered"
            })
        }

        let user = await userModel.create({
            name,
            email,
            password: await bcrypt.hash(password, 10)
        })

        res.status(201).json({
            message: "User registered successfully",
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                }
            }
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        })

    }

}

export const loginUserController = async (req, res) => {
    try {

        let { email, password } = req.body

        let user = await userModel.findOne({ email })

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            })
        }

        let isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            })
        }

        let refreshToken = generateRefreshToken(user._id)
        let accessToken = generateAccessToken(user._id)

        await userModel.findByIdAndUpdate(user._id, { refreshToken })

        res.cookie("refreshToken", refreshToken,
            {
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60 * 1000
            })

        res.status(200).json({
            message: "User logged in successfully",
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
            accessToken

        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }

}

export const rotateTokensController = async (req, res) => {

    let { refreshToken } = req.cookies

    if (!refreshToken) {
        return res.status(401).json({
            message: "Refresh token is required"
        })
    }

    try {
        let decode = verifyRefreshToken(refreshToken)

        let user = await userModel.findById(decode.id)

        if (!user) {
            return res.status(401).json({
                message: "User not found or account removed"
            })
        }


        if (user.refreshToken !== refreshToken) {

            await userModel.findByIdAndUpdate(user._id, { refreshToken: null })
            res.clearCookie("refreshToken")

            return res.status(401).json({
                message: "Token reuse/mismatch detected. Please log in again."
            })
        }

        let newRefreshToken = generateRefreshToken(user._id)
        let newAccessToken = generateAccessToken(user._id)

        await userModel.findByIdAndUpdate(user._id, { refreshToken: newRefreshToken })

        res.cookie("refreshToken", newRefreshToken,
            {
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60 * 1000
            }
        )

        res.status(200).json({
            message: "Token rotated successfully",
            data : {
                user: {
                    id : user._id,
                    name : user.name,
                    email : user.email
                }
            },
            accessToken: newAccessToken
        })

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token , Please login again",
            error: error.message
        })
    }

}

export const fetchMeController = async (req, res) => {
    try {

        let { id } = req.user

        if (!id) {
            return res.status(400).json({
                message: "Invalid token payload"
            })
        }

        let user = await userModel.findById(id)

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        res.status(200).json({
            message: "User fetched successfully",
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                }
            }
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

export const logoutUserController = async (req, res) => {

    try {
        let { id } = req.user

        if (!id) {
            return res.status(400).json({
                message: "Invalid token payload"
            })
        }

        let user =  await userModel.findByIdAndUpdate(id, { refreshToken: null })

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        res.clearCookie("refreshToken", {
            httpOnly : true,
        })

        res.status(200).json({
            message: "User logged out successfully."
        })

    } catch (error) {
        return res.status(500).json({
            message : "Internal server error",
            error : error.message 
        })
    }
}