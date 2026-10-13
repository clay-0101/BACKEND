import express from "express"
import productModel from "../models/product.model.js"
import razorpay from "../config/razorpay.js"
import paymentModel from "../models/payment.model.js"
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils.js"
import { config } from "../config/config.js"


const router = express.Router()

router.post("/:productId/order", async (req, res) => {

    try {
        let { productId } = req.params

        let product = await productModel.findById(productId)

        if (!product) {
            res.status(404).json({
                message: "Product Not Found"
            })
        }

        let order = await razorpay.orders.create({
            amount: Math.round(product.amount * 100),
            currency: product.currency,
            receipt: `order_rcptid_${productId}`,
            notes: {
                productId: productId,
                productName: product.title
            }

        })

        let payment = (await paymentModel.create({
            orderId: order.id,
            productId: productId,
            amount: product.amount,
            currency: product.currency,
            status: "pending"
        })).toObject()

        res.status(201).json({ ...payment, keyId: razorpay.key_id })

    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: "error found"
        })
    }

})

router.post("/verify", async (req, res) => {

    let {orderId, paymentId , signature}  = req.body

    let payment = await paymentModel.findOne({
        orderId: orderId,
        status: "pending"
    })

    if (!payment) {
        res.status(404).json({
            message: "Payment not found"
        })
    }
    const isValid = validatePaymentVerification({
        order_id : orderId,
        payment_id : paymentId
    }, signature , config.RAZORPAY_KEY_SECRET)


    if(!isValid){
        res.status(400).json({
            message : "Invalid Payment verification"
        })
    }

    await paymentModel.updateOne({orderId}, {$set : {status : "completed", paymentId, signature}})



    res.status(201).json({
        message : "Payment verified successful"
    })

})

export default router