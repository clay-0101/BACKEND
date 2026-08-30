const imagekit = require("../config/imageKit-config")

const create = async (req, res) =>{
    
    let file = req.file

    let uploadedFile = await imagekit.upload({
        file : file.buffer,
        fileName : file.originalname,
        folder : 'uploads'
    })

    res.status(201).json({
        message : 'file uploaded successfully',
        imageUrl : uploadedFile.url
    })
}

module.exports = create