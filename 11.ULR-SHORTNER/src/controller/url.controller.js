import urlModel from "../models/url.model.js"
import { generateCode } from "../utils/generateCode.js"



export const saveUrlController = async (req, res) => {

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


}

export const openUrlController = async (req , res) => {

    let {code}  = req.params

    if(!code){
        return res.status(400).json({
            error : "URL is not valid..",
            field : "Client, (not provided)"
        })
    }

    let url = await urlModel.findOne({
        shortCode : code
    })

    if(!url){
        return res.status(400).json({
            error : "URL not found..",
            field :  "Database"
        })
    }

    res.redirect(302, url.originalUrl)

    await urlModel.findOneAndUpdate({shortCode : code}, {$inc : {clicks : 1}})
}

export const getAllUrlController = async (req, res)=>{

    let allURLs = await urlModel.find()

    if(allURLs.length === 0){
        return res.status(400).json({
            message : "No URL Added..."
        })
    }
    res.status(200).json({
        message : "All url fetched..",
        data : {
        allURLs
        }
    })
}