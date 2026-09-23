import mongoose from "mongoose";

const registeredUserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: [3, "Name must be three letter required"],
        maxLength: [50, "Name too long, limit is 50 chars"]
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase : true,
        trim : true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email format"]
    },

    password: {
        type: String,
        required: true,
        minLength : [6, "Password must be six characters"]
    },

    refreshToken: {
        type: String,
        default: null
    }
}, {timestamps : true})

const userModel = mongoose.model("Registered-Users", registeredUserSchema)
export default userModel