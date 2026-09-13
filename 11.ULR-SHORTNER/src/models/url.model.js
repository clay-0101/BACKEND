import mongoose from "mongoose";

const urlSchema = mongoose.Schema({
    
    originalUrl : {
        type : String,
        required : true,
        maxlength : [2048 , "URL is too long"]
    },
    shortCode : {
        type : String,
        required : true
    },
    click : {
        type : Number,
        default : 0

    }
},{timestamps : true})

const urlModel = mongoose.model('All-URLs', urlSchema)
export default urlModel