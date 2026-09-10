import mongoose from 'mongoose'
import { config } from './config.js'

const connectDB = async () => {

    try {
        await mongoose.connect(config.mongoUri)
        console.log("database is connected..")
        
    } catch (error) {
        console.log('Error while connecting DB', error)
    }
}

export default connectDB