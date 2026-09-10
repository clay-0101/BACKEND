import dotenv from 'dotenv'
dotenv.config()

export const config = {

    mongoUri : process.env.MONGO_URI,
    port : process.env.PORT,
    accessTokenSecret : process.env.ACCESS_TOKEN_SECRET,
    refreshTokenSecret : process.env.REFRESH_TOKEN_SECRET
}