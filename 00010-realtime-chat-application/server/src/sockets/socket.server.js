import { Server } from "socket.io";
import { verifyToken } from "../utils/jwt.js";


export default function (httpServer) {

    const io = new Server(httpServer);

    io.use((socket, next) =>{
        const token = socket.handshake.headers?.authorization?.split(" ")[ 1 ]

        if(!token){
            return next(new Error("Authentication error"))
        }

        try {

           let decode = verifyToken(token, "access") 
           socket.user = decode

           next()

        } catch (error) {
            return next(new Error("Authentication error"))
        }
    })

    io.on('connection', (socket) => {

        socket.on("message", (msg)=>{
            
            socket.broadcast.emit("message", {...msg , email : socket.user.email})
        })
        console.log("A user is connected", socket.id)
    })
}