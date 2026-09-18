import express from 'express'
import { registerUserController } from '../controller/authController.js'
import { registerationValidator } from '../validator/register.validator.js'

const router = express.Router()

router.post('/register',registerationValidator,registerUserController)

export default router