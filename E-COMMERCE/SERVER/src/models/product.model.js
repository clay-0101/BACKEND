import mongoose from 'mongoose'

export const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 100
    },
    description: {
        type: String,
        required: true,
        minLength: 20,
        maxLength: 500,
    },
    images: {
        type: [String],
        validate: {
            validator: images => images.length === 5,
            message: "A product can have five images required"
        }
    },

    price: {
        amount: {
            type: Number,
            required: true,
        },
        currency: {
            type: String,
            enum: {
                values: ["USD", "INR"],
                message: "Currency either be INR or USD"
            },
            default: "INR"
        }
    },

    sizes: [
        {
            size: {
                type: String,
                required: true,
                enum: {
                    values: ["XS", "S", "M", "L", "XL", "XXL"],
                    message: "size can be one of these  XS,S,M,L,XL,XXL "
                }
            },
            stock: {
                type: Number,
                min: 0,
                default: 0
            }
        }
    ],

    seller: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Registered-Users"
    }
}, { timestamps: true })

const productModel = mongoose.model("Products", productSchema)
export default productModel