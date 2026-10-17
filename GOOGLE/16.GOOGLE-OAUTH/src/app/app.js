import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import passport from "passport"
import router from "../routes/auth.route.js"


const app = express()

app.use(express.json())

app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}))

app.use(cookieParser())
app.use(passport.initialize())
app.use("/api/auth" , router)

export default app