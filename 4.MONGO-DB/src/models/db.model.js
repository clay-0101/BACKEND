const mongoose = require('mongoose')

let storySchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    story :{
        type : String,
        minlength : 10
    }
})

let storyModel = mongoose.model('story', storySchema)
module.exports = storyModel