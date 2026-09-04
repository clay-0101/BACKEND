import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        match : [/^\S+@\S+\.\S+$/, 'Enter a valid email']
    },

    password: {
        type: String,
        required: true,
        minlength : 6
    },

    role: {
        type: String,
        enum: ['admin', 'customer'],
        default: 'customer'
    }

})

const userModel = mongoose.model('users', userSchema)
export default userModel