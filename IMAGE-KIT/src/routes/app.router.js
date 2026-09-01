import express from 'express'
import upload from '../config/multer.config.js'
import create from '../controllers/user.controoler.js'

const router = express.Router()


router.post('/upld', upload.single('image'), create)

export default router