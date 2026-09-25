
export const requireImages = (req, res, next) => {

    try {

        if (!req.files || req.files.length < 1) {
            return res.status(400).json({
                message: "At lease one image is required"
            })
        }

        if(req.files.length > 5){
            return res.status(400).json({
                message : "You can upload a maximum of 5 images only"
            })
        }
        next()
        
    } catch (error) {
        return res.status(500).json({
            message : "Internal server error",
            error : error.message
        })
    }

}