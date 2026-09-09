import jwt from 'jsonwebtoken'
import { config } from '../config/config.js'

export const getAuthTokens = (userId) => {

    const refreshToken = jwt.sign({ id: userId }, config.refreshTokenSecret, { expiresIn: "7d" })

    const accessToken = jwt.sign({ id: userId }, config.accessTokenSecret, { expiresIn: "15m" })

    return { refreshToken, accessToken }
}

export const verifyAccessToken = (accessToken) => {
    let verifiedToken = jwt.verify(accessToken, config.accessTokenSecret)
    return verifiedToken
}

export const verifyRefreshToken = (refreshToken) =>{
    let verifiedToken = jwt.verify(refreshToken, config.refreshTokenSecret)
    return verifiedToken
}