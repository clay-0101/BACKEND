import { body, validationResult } from 'express-validator'

export const productValidator = [

    body("title")
        .exists().withMessage("Title is required").bail()
        .isString().withMessage("Title must be a string").bail()
        .trim()
        .isLength({ min: 2, max: 100 }).withMessage("Value must be 2–100 characters long."),
        // .isAlphanumeric("en-US", { ignore: " " }).withMessage("Input must contain letters only."),


    body("description")
        .exists().withMessage("Description is required").bail()
        .isString().withMessage("Description must be a string").bail()
        .trim()
        .isLength({ min: 20, max: 500 }).withMessage("Value must be 20–500 characters long."),



    body("price.amount")
        .exists().withMessage("Price amount is required").bail()
        .isFloat({ min: 0.01 }).withMessage("Only numbers ≥ 0 allowed."),

    body("price.currency")
        .optional()
        .isString().withMessage("Price Currency must be a string").bail()
        .isIn(["INR", "USD"]).withMessage("Currency either be INR or USD"),


    body("sizes")
        .exists().withMessage("Sizes are required").bail()
        .isArray({min : 1, max : 6}).withMessage("Sizes must be an array and allowed only 1-6 items").bail()
        .custom((sizes) => {


            if(sizes.some(item => !item.size)){
                throw new Error("Sizes must be present in every entry")
            }

            let sizeValues = sizes.map(item => item.size)

            if(new Set(sizeValues).size !== sizeValues.length){
                throw new Error("Duplicate size are not allowed")
            }

            return true

        }),


    body("sizes.*.size")
        .exists().withMessage("Sizes must be present in every entry of array").bail()
        .isString().withMessage("Size must be string value").bail()
        .trim()
        .isIn(["XS", "S", "M", "L", "XL", "XXL"]).withMessage("size can be one of these  XS , S , M , L , XL , XXL "),

    body("sizes.*.stock")
        .optional()
        .isInt({ min: 0 }).withMessage("Stock must be an integer value"),
    

    (req, res, next) => {
        
        let errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                message : "Validation failed",
                error : errors.array()
            })
        }
        
        next()
    }
]