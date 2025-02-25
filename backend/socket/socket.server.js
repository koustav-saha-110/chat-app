import { Server } from "socket.io";

let io;
let connectedUsers = {};

export const initIO = (httpServer) => {
    io = new Server(httpServer, {
        cors: {
            origin: process.env.CLIENT_URL,
            credentials: true,
            methods: ["GET", "POST", "PUT", "DELETE"],
        },
    });

    io.use((socket, next) => {
        const userId = socket.handshake.auth.userId;
        if (!userId) {
            return next(new Error("Authentication error"));
        }

        socket.userId = userId;
        next();
    });

    io.on("connection", (socket) => {
        console.log("A new user connected", socket.id);
        connectedUsers[socket.userId] = socket.id;

        io.emit("onlineUsers", Object.keys(connectedUsers));

        socket.on("disconnect", () => {
            console.log("A user disconnected", socket.id);
            delete connectedUsers[socket.userId];
            
            io.emit("onlineUsers", Object.keys(connectedUsers));
        });
    });
}

export const getIO = () => {
    if (!io) {
        throw new Error("Socket.io not initialized");
    }

    return io;
}

export const getConnectedUsers = () => connectedUsers;
