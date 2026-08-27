const express = require('express')
const upload = require('../config/multer')

const router = express.Router()

router.post('/',upload.single('image') , (req, res)=>{
    try {
     let body = req.body
     let file = req.file


     console.log(body) 
     console.log(file)  

     res.status(201).json({
        message : "file created successfully..."
     })
    } catch (error) {
       res.status(500).json({
        message : "Internal Server Error"
       }) 
    }
})

module.exports = router