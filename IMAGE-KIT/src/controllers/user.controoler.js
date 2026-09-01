 import imagekit from "../config/imageKit-config.js";

 const create = async (req , res)=>{
    
    let file = req.file

    let uploadFile = await imagekit.upload({
        file : file.buffer,
        fileName : file.originalname,
        folder : 'uploads'
    })

    res.status(200).json({
        message : "file uploaded successfully",
        imageUrl : uploadFile.url
    })
 }

 export default create