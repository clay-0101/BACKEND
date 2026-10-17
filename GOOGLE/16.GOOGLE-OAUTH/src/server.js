import "dotenv/config"
import app from "./app/app.js"
import { connectDb } from "./config/db.js"


await connectDb()

let port = process.env.PORT || 4000


app.listen(port , ()=>{
    console.log("server is running on ", port)
})