import { verifyAccessToken } from "../utils/app.utils.js"

export const authenticate = (req, res, next) => {

    let authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith("bearer ")) {
        return res.status(401).json({
            message: "Access token missing or invalid"
        })
    }
    let accessToken = authHeader.split(" ")[1]

    if (!accessToken) {
        return res.status(401).json({
            message: "Access token missing or invalid"
        })
    }

    try {
        let decode = verifyAccessToken(accessToken)
        req.user = decode
        next()

    } catch (error) {
        return res.status(401).json({
            message: "Access token missing or invalid"
        })
    }
}