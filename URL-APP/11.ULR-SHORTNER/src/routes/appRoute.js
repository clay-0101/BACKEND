import express from 'express'
import { generateCode } from '../utils/generateCode.js'
import urlModel from '../models/url.model.js'
import { getAllUrlController, openUrlController, saveUrlController } from '../controller/url.controller.js'

const router = express.Router()

router.post('/url', saveUrlController)

router.get("/open/:code", openUrlController)

router.get("/all", getAllUrlController)

export default router