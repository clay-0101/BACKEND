import multer from "multer"


export const upload = multer({
    storage : multer.memoryStorage(),
    limits : {
        // files : 5, I used requireImage middleware  instead of this
        fileSize : 1 * 1024 * 1024
    }
})