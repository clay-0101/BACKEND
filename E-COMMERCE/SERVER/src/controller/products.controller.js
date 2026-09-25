
import userModel from "../models/auth.model.js"
import productModel from "../models/product.model.js"
import { deleteFile, uploadFile } from "../services/imagekit.service.js"



export const createProductController = async (req, res) => {
    try {
        let { id } = req.user
        let { title, description, sizes, price } = req.body

        let user = await userModel.findById(id)

        if (!user) {
            return res.status(404).json({
                message: "User not exists"
            })
        }
        const fileData = []

        for (let i = 0; i < req.files.length; i++) {
            const response = await uploadFile({
                buffer: req.files[i].buffer,
                fileName: req.files[i].originalname
            })

            fileData.push({
                url: response.url,
                fileId: response.fileId
            })
        }


        let product = await productModel.create({
            title,
            description,
            price,
            sizes,
            images: fileData,
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
            message: "Internal server error",
            error: error.message
        })
    }
}

export const fetchProductsController = async (req, res) => {

    try {
        let products = await productModel.find()

        if (products.length === 0) {
            return res.status(404).json({
                message: "No product found"
            })
        }

        res.status(200).json({
            message: "All products fetched..",
            data: {
                products
            }
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

export const fetchSingleProductController = async (req, res) => {

    try {
        let { id } = req.params

        if (!id) {
            return res.status(400).json({
                message: "ID is required in params"
            })
        }

        let product = await productModel.findById(id)

        if (!product) {
            return res.status(404).json({
                message: "No product found"
            })
        }

        res.status(200).json({
            message: "Product fetched successfully",
            data: {
                product
            }
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

export const deleteProductController = async (req, res) => {
    try {
        let userId = req.user.id
        let productId = req.params.id

        let isUserExist = await userModel.findById(userId)

        if (!isUserExist) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        let product = await productModel.findById(productId)

        if (!product) {
            return res.status(404).json({
                message: "No product found"
            })
        }
        for (let image of product.images) {
            await deleteFile(image.fileId)
        }

        let deletedProduct = await productModel.findByIdAndDelete(productId)

        res.status(200).json({
            message: "Product delete successfully",
            data: {
                deletedProduct
            }
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

export const updataProductController = async (req, res) => {

    try {
        let userId = req.user.id
        let productId = req.params.id
        let updatedData = req.body


        let fileData = []

        let isUserExist = await userModel.findById(userId)

        if (!isUserExist) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        //Delete old images from imgkit - find product -> check is product exists -> old img deleted
        let product = await productModel.findById(productId)

        if (!product) {
            return res.status(404).json({
                message: "No product found"
            })
        }

        for(let image of product.images){
            await deleteFile(image.fileId)
        }

        // set new images 
        for (let i = 0; i < req.files.length; i++) {

            let response = await uploadFile({
                buffer: req.files[i].buffer,
                fileName: req.files[i].originalname
            })

            fileData.push({
                url: response.url,
                fileId: response.fileId
            })
        }

        let updatedProduct = await productModel.findByIdAndUpdate(productId, { ...updatedData, images: fileData }, { returnDocument: "after" })

        if (!updatedProduct) {
            return res.status(404).json({
                message: "No product found"
            })
        }

        res.status(200).json({
            message: "Product updated successfully",
            data: {
                updatedProduct
            }
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}