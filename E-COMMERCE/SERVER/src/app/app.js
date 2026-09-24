import express from 'express'
import authRouter from '../routes/auth.router.js'
import productRouter from '../routes/product.router.js'
import cookieParser from "cookie-parser"

const app = express()

app.use(express.json())

app.use(cookieParser())

app.use("/api/auth", authRouter)
app.use("/api/products", productRouter)

export default app