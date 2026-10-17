import jwt from 'jsonwebtoken'



export const verifyAccessToken = (accessToken) => {
    return jwt.verify(accessToken, process.env.JWT_SECRET)
}