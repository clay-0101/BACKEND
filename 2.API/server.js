// let http = require('http')

// let server = http.createServer((req, res)=>{
//     console.log('rendering...')
//     res.end('Running Safely Wihout Error')
// })


// server.listen(3000, ()=>{
//     console.log('this server is running on port 3000')
// })


const express = require('express')

let app = express()
app.use(express.json())

app.get('/', (req, res)=>{
    console.log(req)
   res.send("you're at home")

})
app.post('/',(req, res)=>{
    if(req.body.name === 'carry' && req.body.password === 123123){
        res.send('Login successfully')
        return
    }
    res.send('Invalid credentials')
})

app.listen(3000,()=>{
    console.log('sever is running on port 3000')
})