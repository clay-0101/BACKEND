import app from "../src/app/app.js"
import { connectDb } from "../src/config/db.js"

let dbConnected = false

export default async function handler(req, res) {
    if (!dbConnected) {
        await connectDb()
        dbConnected = true
    }
    return app(req, res)
}