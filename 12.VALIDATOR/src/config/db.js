import mongoose from "mongoose";
import { config } from "./config.js";

export const connectDB = async () =>{
    try {
      await mongoose.connect(config.mongoUri)  
      console.log("Database connected Successfullyy..")
    } catch (error) {
        console.log("error while connecting database ",error)
    }
}