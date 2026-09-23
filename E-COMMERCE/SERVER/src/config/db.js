import mongoose from "mongoose"
import { config } from "./config.js"

export const connectDb = async () => {

    try {
        await mongoose.connect(config.mongoUri)
        console.log("Database connected..")

    } catch (error) {
        console.log("Error occur whitle connecting database", error)
    }

}