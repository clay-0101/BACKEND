import userModel from "../models/user.model.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const registerUserController = async (req, res) => {

    try {
        let { name, email, password, role } = req.body

        let isEmailAlreadyRegistered = await userModel.findOne({ email })

        if (isEmailAlreadyRegistered) {
            return res.status(400).json({
                message: `This email (${email}) is already registered..`
            })
        }

        const user = await userModel.create({
            name,
            email,
            role,
            password:  await bcrypt.hash(password, 10)
        })

        let token = jwt.sign(
            {
                id: user._id
            },
            process.env.JWT_SECRET
        )

        res.status(201).json({
            message: "User Registered Successfully..",
            data: {
                user: {
                    name: user.name,
                    email: user.email,
                    role: user.role
                },
                token
            }
        })

    } catch (error) {
        res.status(500).json({
            message: `${error}`
        })
    }
}

export const loginUserController = async (req, res) => {

    try {
        let { email, password } = req.body

        let isUserExist = await userModel.findOne({ email })

        if (!isUserExist) {
            return res.status(400).json({
                message: "This email is not registered..."
            })
        }

        let isValidPassword = await bcrypt.compare(password, isUserExist.password)

        if (!isValidPassword) {
            return res.status(400).json({
                message: "Invalid Password"
            })

            let token = jwt.sign(
                {
                    id: isUserExist._id
                },
                process.env.JWT_SECRET
            )

            res.status(200).json({
                message: "User Logged in Successfully...",
                data: {
                    user: {
                        name: isUserExist.name,
                        email: isUserExist.email,
                        role: isUserExist.role
                    },
                    token
                }
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        })
    }

}


const token = jwt.sign(
    { 
        id: user._id // payload (user info)
    },
     process.env.JWT_SECRET  // secret key;
    )
