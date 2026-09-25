
import userModel from "../models/auth.model.js"
import productModel from "../models/product.model.js"
import { uploadFile } from "../services/imagekit.service.js"


export const createProductController = async (req, res) => {
    try {
        let { id } = req.user
        let { title, description, sizes, price } = req.body

        let user = await userModel.findById(id)

        if (!user) {
           return  res.status(404).json({
                message: "User not exists"
            })
        }
        const fileUrls = []

        for (let i = 0; i < req.files.length; i++) {
            const response = await uploadFile({
                buffer: req.files[i].buffer,
                fileName: req.files[i].originalname
            })

            fileUrls.push(response.url)
        }


        let product = await productModel.create({
            title,
            description,
            price,
            sizes,
            images: fileUrls,
            seller: id
        })


        res.status(201).json({
            message: "Product created successfully",
            data: {
                product
            }
        })
    } catch (error) {
        return res.status(500).json({
            message : "Internal server error",
            error : error.message
        })
    }
}