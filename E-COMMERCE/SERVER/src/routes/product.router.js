import express, { json } from 'express'
import { authenticate } from '../middlewares/auth.middleware.js'
import { createProductController } from '../controller/products.controller.js'
import { productValidator } from '../validator/product.validator.js'
import { upload } from '../config/multer.js'
import { productDataParser } from '../middlewares/productDataParser.js'

const router = express.Router()

router.post("/", authenticate,
    upload.array("images"),
    productDataParser,
    productValidator,
    createProductController)

export default router