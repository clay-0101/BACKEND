import jwt from 'jsonwebtoken'
import { config } from '../config/config.js'

export const generateRefreshToken = (id) => {
    return jwt.sign({id}, config.refreshTokenSecret, {expiresIn : "7d"})  
}

export const generateAccessToken = (id) => {
    return jwt.sign({id}, config.accessTokenSecret, {expiresIn : "15m"})
}

export const verifyRefreshToken = (refreshToken) => {
    return jwt.verify(refreshToken , config.refreshTokenSecret)
}

export const verifyAccessToken = (accessToken) => {
    return jwt.verify(accessToken, config.accessTokenSecret)
}