import 'dotenv/config';
import app from "./src/app.js";


let port = process.env.PORT || 4000
app.listen(port, ()=>{
    console.log(`server is running on port ${port}`)
})
