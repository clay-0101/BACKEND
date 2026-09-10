import express from 'express'
import { getMyData, getNewTokensController, registerUserController } from '../controllers/auth.controller.js'

const router = express.Router()

router.post('/register', registerUserController)

router.get('/me', getMyData)

router.get('/refresh', getNewTokensController)

export default router