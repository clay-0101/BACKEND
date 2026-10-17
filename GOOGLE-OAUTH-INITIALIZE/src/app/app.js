import express from "express"
import morgan from "morgan"
import passport from "../config/passport.js"
import router from "../routes/auth.route.js"

const app = express()
app.use(morgan("dev"))

app.use(passport.initialize())
app.use("/api/auth", router)

export default app