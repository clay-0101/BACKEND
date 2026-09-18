import {body, validationResult} from 'express-validator'

export const registerationValidator = [

    body("email")
        .exists().withMessage("Email is required")
        .isEmail().withMessage("Invalid email format"),


    body("phone")
        .exists().withMessage("Phone No. is required")
        .isMobilePhone('en-IN').withMessage("Provide a indian mobile number"),


    body("password")
        .exists().withMessage("Password is required")
        .trim().isLength({ min: 6 }).withMessage("Password must be at least six characters"),

        
    (req, res, next) => {

        let errors = validationResult(req)

        if (!errors.isEmpty()) {
            res.status(400).json({
                message: "Invalid credentials",
                errors: errors.array()
            })
        }
        next()
    }

]