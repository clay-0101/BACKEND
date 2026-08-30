const express  = require('express')
const upload = require('../config/multer.config')
const create = require('../controllers/user.controoler')

const router = express.Router()

router.post('/create', upload.single('image'), create)

module.exports = router