import express from 'express'
import { generateCode } from '../utils/generateCode.js'
import urlModel from '../models/url.model.js'

const router = express.Router()

router.post('/url', async (req, res) => {

    let { url } = req.body

    if (!url) {
        return res.status(400).json({
            error: "Please enter a URL"
        })
    }

    if (url.startsWith("http://") == false && url.startsWith("https://") == false) {
        return res.status(400).json({
            error: "Please enter a valid URL , starts with http:// or https://"
        })
    }

    if (url.length > 2048) {
        return res.status(400).json({
            error: "URL is too long"
        })
    }

    const code = generateCode()

    const newUrl = await urlModel.create({

        originalUrl: url,
        shortCode: code

    })

    res.status(201).json({
        message: "URL saved successfully..",
        data: {
            originalUrl: newUrl.originalUrl,
            shortCode: newUrl.shortCode
        }
    })


})

export default router