import { body, validationResult } from "express-validator"


export const registerValidator = [

    body("name")
        .exists().withMessage("Name is required").bail()
        .isString().withMessage("Name must be a string").bail()
        .trim()
        .isLength({ min: 3, max: 50 }).withMessage("Name must be between 3 and 50 characters."),


    body("email")
        .exists().withMessage("Email is required").bail()
        .isEmail().withMessage("Invalid email format"),


    body("password")
        .exists().withMessage("Password is required").bail()
        .isString().withMessage("Password must be a string").bail()
        .trim()
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),


    body("confirmPassword")
        .exists().withMessage("Confirm your password").bail()
        .custom((value, { req }) => {

            if (!req.body.password) {
                throw new Error("Password is required before confirming it")
            }

            if (value !== req.body.password) {
                throw new Error("Password do not match")
            }

            return true
        }),


    (req, res, next) => {

        let errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: "Validation failed",
                error: errors.array()
            })
        }

        next()
    }

]

export const loginValidator = [

    body("email")
        .exists().withMessage("Email is required").bail()
        .isEmail().withMessage("Invalid email format"),

        
    body("password")
        .exists().withMessage("Password is requried").bail()
        .isString().withMessage("Password must be a string").bail()
        .trim()
        .isLength({ min: 6 }).withMessage("Password must be at least six characters"),


    (req, res, next) => {

        let errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: "Validation failed",
                error: errors.array()
            })
        }

        next()
    }
]