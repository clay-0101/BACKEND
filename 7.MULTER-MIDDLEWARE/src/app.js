const express = require('express')
const router = require('./routes/app.router')
const upload = require('./config/multer')

let app = express()
app.use(express.json())

app.get('/',(req, res)=>{
    res.send('All Ok Code continue...')
})

app.use('/file', router)

module.exports = app