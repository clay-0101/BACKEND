import mongoose from "mongoose";

const userSchema = mongoose.Schema({

    name :{
        type : String,
        required : true,
        minlength : [3, "Minimum 3 letter is required.."],
        maxlength : [50, "Maximum 50 letter is required.."]
    },

    email :{
        type : String,
        required : true ,
        match : [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ , "Invalid Email.."],
        unique : true
    },

    password : {
        type : String,
        required : true,
    },

    refreshToken :{
        type : String
    }
})

const userModel = mongoose.model('users', userSchema)

export default userModel