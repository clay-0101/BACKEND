import registerUserModel from "../model/authModel.js"

export const registerUserController = async (req, res) => {

    try {
        let { email, phone, password } = req.body

        // let errors = []
        // let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        // let phoneRegex = /^(\+91[\-\s]?)?[6-9]\d{9}$/

        // if (!email) {
        //     errors.push({
        //         error: {
        //             field: "email",
        //             message: "email is required"
        //         }
        //     })
        // }

        // if (email && !emailRegex.test(email)) {
        //     errors.push({
        //         error: {
        //             field: "email",
        //             message: "Invalid email format"
        //         }
        //     })
        // }

        // if (!phone) {
        //     errors.push({
        //         error: {
        //             field: "phone",
        //             message: "Phone no. is required"
        //         }
        //     })
        // }

        // if (phone && !phoneRegex.test(phone)) {
        //     errors.push({
        //         error: {
        //             field: "phone",
        //             message: "Provide a indian phone number"
        //         }
        //     })
        // }

        // if (!password || !password.trim()) {
        //     errors.push({
        //         error: {
        //             field: "password",
        //             message: "Please provide a password"
        //         }
        //     })
        // }

        // if (password.trim() && password.trim().length < 6) {
        //     errors.push({
        //         error: {
        //             field: "password",
        //             message: "Password must be at least 6 characters"
        //         }
        //     })
        // }

        // if (errors.length > 0) {
        //     res.status(400).json({
        //         message: "Invalid Credentials",
        //         errors
        //     })
        // }

        let user = await registerUserModel.create({
            email,
            phone,
            password
        })

        res.status(201).json({
            message: "User registered successfully..",
            data: {
                user: {
                    email: user.email,
                    phone: user.phone
                }
            }
        })
    } catch (error) {
        console.log(error)
    }



}