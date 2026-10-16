import { Server } from "socket.io"

export function initializeSocket(httpServer) {

    const io = new Server(httpServer)

    io.on("connection", (socket) => {
        console.log("A user Connected", socket.id)

        socket.on("disconnect", () => {
            console.log("A user Disconnect", socket.id)
        })
    })



}