const express = require('express')
const connectDB = require('./config/database')
const notesRouter = require('./Routes/notes.router')

let app = express()
connectDB()
app.use(express.json())

app.get('/', (req, res) => {
    res.send('All Ok Code Continue...')
})


app.use('/diary', notesRouter )


module.exports = app