const express = require('express')
const cors = require('cors')
const connectDB = require('./config/database')
const notesRouter = require('./Routes/notes.router')

let app = express()
connectDB()
app.use(express.json())
app.use(cors({
    origin : 'http://localhost:5173'
}))

app.get('/', (req, res) => {
    res.send('All Ok Code Continue...')
})


app.use('/diary', notesRouter )


module.exports = app