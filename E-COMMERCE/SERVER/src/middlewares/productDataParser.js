
export const productDataParser = (req, res, next) => {
     
    try {
        if (req.body?.price && typeof req.body.price === "string") {
            req.body.price = JSON.parse(req.body.price)
        }

        if (req.body?.sizes && typeof req.body.sizes === "string") {
            req.body.sizes = JSON.parse(req.body.sizes)
        }
       
        next()
    } catch (error) {
        return res.status(400).json({
            message: "Invalid json format in price and sizes field",
            error: error.message
        })
    }
}