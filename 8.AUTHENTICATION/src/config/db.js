import mongoose from 'mongoose'

export async function connectDB() {
    
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Database Connected Successfully...')

    } catch (error) {

        console.log('Error occur whitle connecting DB : ', error)
    }
}