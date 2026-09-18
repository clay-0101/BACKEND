import mongoose from "mongoose";

const registerUserSchema = mongoose.Schema({

    email: {
        type: String,
        required: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    phone: {
        type: Number,
        required: true,
        match: /^(\+91[\-\s]?)?[6-9]\d{9}$/
    },
    password: {
        type: String,
        required: true,
        minlength: [6, "Minumum 6 character required"]
    },
})


const registerUserModel = mongoose.model("users", registerUserSchema)
export default registerUserModel