import express, { Router } from 'express'
import router from '../routes/app.router.js'


const app = express()

app.use(express.json())

app.use('/', router)

export default app

