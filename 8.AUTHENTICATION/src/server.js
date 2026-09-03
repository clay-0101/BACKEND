import 'dotenv/config'
import app from "./app/app.js";
import { connectDB } from './config/db.js';

await connectDB() // For Best Prcatice...


let port = process.env.PORT || 4000

app.listen(port, ()=>{
    console.log(`server is running on port ${port}`)
})