let http = require('http')

let server = http.createServer((req , res)=>{
    console.log('Server is running')
    res.end("This is carry's First Server")
})

server.listen(3000, ()=>{
    console.log('server is running on port 3000')
})