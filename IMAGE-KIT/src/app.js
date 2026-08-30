const express = require('express')
const userRoutes = require('./routes/app.router')

const app = express()

app.use(express.json())

app.use('/main', userRoutes)

module.exports = app