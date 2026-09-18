import mongoose from 'mongoose'
import { config } from './config.js'


export const connectDB = async () => {
    
    try {
       await mongoose.connect(config.mongoUrl) 
       console.log('Database connected Successfully..')
    } catch (error) {
        console.log(error)
    }
}