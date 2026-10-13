import "dotenv/config"

export const config = {
    
    mongoUri : process.env.MONGO_URI,
    port : process.env.PORT,
    RAZORPAY_API_KEY : process.env.RAZORPAY_API_KEY,
    RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET

}