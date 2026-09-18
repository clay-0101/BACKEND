import 'dotenv/config'


export const config = {
    mongoUri : process.env.MONGO_URI,
    port : process.env.PORT
}