import mongoose from "mongoose";

const registerUserSchema = mongoose.Schema({

    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    }
})

const registerUserModel = mongoose.model('Registered_Users',registerUserSchema)
export default registerUserModel