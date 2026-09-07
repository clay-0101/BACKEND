import express from 'express'
import { createProduct, loginUserController, registerUserController } from '../controller/authController.js'
import { isAdmin, verifyToken } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/register' , registerUserController)

router.post('/login', loginUserController)

router.post('/addproduct', verifyToken, isAdmin , createProduct)

export default router