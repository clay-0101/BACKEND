const express = require('express')
const storyModel = require('./models/db.model')
const connectDB = require('./config/database')

const app = express()

app.use(express.json())
connectDB()
app.get('/',(req, res)=>{
    res.send('Connection Secured..')
})

app.post('/create',async(req, res)=>{
    let {name , story} = req.body

    let newNote = await storyModel.create({
        name , 
        story
    })
    
    res.send(newNote)
})
// app.get('/user/:id', async(req, res)=>{
//     let note = await storyModel.findById(req.params.id)
//     res.json(note)
// })
// app.get('/users', async(req, res)=>{
//     let note = await User.find()
//     res.json(note)
// })

module.exports = app