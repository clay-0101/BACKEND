import mongoose from "mongoose"
import { config } from "./config.js"

const connectDB = async () => {
    try {

        await mongoose.connect(config.mongoUri)
        console.log("Database connected")

    } catch (error) {

        console.log("Error while connected to DB", error)

    }
}

export default connectDB;