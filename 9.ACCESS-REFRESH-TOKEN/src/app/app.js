import express from 'express'
import router from '../routes/app.router.js'
import cookieParser from 'cookie-parser'

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use('/',router)

export default app