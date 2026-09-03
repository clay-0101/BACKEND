import express from 'express'

import {
    registerUserController,
    getClientController,
    loginUserController
} from '../controller/user.controller.js'

import { authenticate } from '../middleware/authenticate.user.js'


const router = express.Router()

router.post('/auth/register', registerUserController)

router.get('/auth/me', authenticate,getClientController)

router.post('/auth/login',loginUserController)

export default router