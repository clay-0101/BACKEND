import 'dotenv/config'
import app from "./app/app.js";
import { connectToDB } from './config/db.js';

await connectToDB()
let port = process.env.PORT || 4000
app.listen(port, ()=>{
    console.log(`server is running on port ${port}`)
})