import express from 'express'
import { authenticate } from '../middlewares/auth.middleware.js'
import {  createProductController } from '../controller/products.controller.js'

const router = express.Router()

router.post("/",authenticate, createProductController)

export default router