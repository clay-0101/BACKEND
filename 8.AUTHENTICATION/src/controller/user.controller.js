import registerUserModel from "../model/user.model.js"
import bycript from 'bcrypt'
import jwt from 'jsonwebtoken'

export const registerUserController = async (req, res)=>{

    let {name , email , password} = req.body

    let user = await registerUserModel.create({
        name ,
        email,
        password : await bycript.hash(password, 10)
    })

    let token = jwt.sign(
        {
            id : user._id
        },
        process.env.JWT_SECRET
    )

    res.status(201).json({
        message : "User Created Successfully...",
        user : {
            id : user._id,
            name, email
        },
        token
    })
}
export const getClientController = async (req, res) => {

    console.log(req.user)

    res.status(200).json({
        data: {
            user: req.user
        }
    })
}

export const loginUserController = async (req, res) => {

    let { email, password } = req.body

    let user = await registerUserModel.findOne({
        email
    })

    if (!user) {
        return res.status(400).json({
            message: "Invalid Email or Password"
        })
    }
    let isValidPassword = await bycript.compare(password, user.password)

    console.log(isValidPassword)

    if (!isValidPassword) {
        return res.status(400).json({
            message: "Invalid Email or Password"
        })
    }

    let token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET)

    res.status(200).json({
        message: "User Logged in Successfully...",
        data: {
            user: {
                email: user.email,
                name: user.name
            },
            token
        }
    })

}

