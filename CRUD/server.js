const express = require('express')


let app = express()
app.use(express.json())

let users = []

// READ
app.get('/',(req, res)=>{
    res.send(users)
})

// CREATE
app.post('/create',(req,res)=>{
    let userData = req.body
    users.push(userData)
    res.send('Added Successfully..')
})

// DELETE 
app.delete('/delete/:id',(req, res)=>{
    let {id} = req.params
    let remainUser = users.filter((val)=> val.id !== id)
    users = [...remainUser]
    res.send(`user - ${id} deleted `)
})

//Update
app.put('/update/:id',(req, res)=>{
    let updatedData = req.body
    let {id} = req.params

    let updatedUsers = users.map((val)=>{
        return val.id === id ? updatedData : val
    })
    users = [...updatedUsers]
    res.send(`user - ${id} updated`)
})


// ASSIGN PORT
app.listen(3000,()=>{
    console.log('Running on port 3000')
})