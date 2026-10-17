import "dotenv/config"
import app from "./app/app.js";



let port = process.env.PORT || 4000

app.listen(port, ()=> {
    console.log("Server is running on port : ",port)
})