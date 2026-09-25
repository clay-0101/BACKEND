import "dotenv/config"

export const config = {

    mongoUri: process.env.MONGO_URI,
    port: process.env.PORT,
    refreshTokenSecret : process.env.REFRESH_TOKEN_SECRET,
    accessTokenSecret : process.env.ACCESS_TOKEN_SECRET,
    imagekitPrivateKey : process.env.IMAGEKIT_PRIVATE_KEY

}