import jwt from 'jsonwebtoken'
import { config } from '../config/config'

export const getAuthTokens =  (userId)=>{
   
    const refreshToken = jwt.sign({id : userId} ,config.refreshTokenSecret, {expiresIn : "7d"})

    const accessToken = jwt.sign({id : userId} , config.refreshTokenSecret , {expiresIn : "15m"})

    return {refreshToken , accessToken}
}