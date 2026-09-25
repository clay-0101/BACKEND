import express, { json } from 'express'
import { authenticate } from '../middlewares/auth.middleware.js'
import { createProductController, deleteProductController, fetchProductsController, fetchSingleProductController, updataProductController } from '../controller/products.controller.js'
import { productValidator } from '../validator/product.validator.js'
import { upload } from '../config/multer.js'
import { productDataParser } from '../middlewares/productDataParser.js'
import { requireImages } from '../middlewares/requireImages.js'

const router = express.Router()

router.post("/", authenticate,
    upload.array("images"),
    requireImages,
    productDataParser,
    productValidator,
    createProductController)

router.get("/", fetchProductsController)

router.get("/:id", fetchSingleProductController)

router.delete("/:id", authenticate ,deleteProductController)

router.put("/:id", authenticate,
     upload.array("images"),
     requireImages,
     productDataParser,
     productValidator,
     updataProductController)

export default router