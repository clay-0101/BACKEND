const mongoose = require('mongoose')

let noteSchema = mongoose.Schema({
    title : {
        type : String,
        required : true 
    },
    description :{
        type : String,
        required : true,
        minlength : 10
    }

})

let noteModel = mongoose.model('diary', noteSchema)
module.exports = noteModel