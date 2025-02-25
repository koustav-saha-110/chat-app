import Message from "../models/message.model.js";
import { getConnectedUsers, getIO } from "../socket/socket.server.js";

export const getMessages = async (req, res) => {
    try {
        const messages = await Message.find({
            $or: [
                { sender: req.user._id, receiver: req.params.id },
                { sender: req.params.id, receiver: req.user._id },
            ]
        }).sort({ createdAt: 1 });

        res.json({
            success: true,
            messages
        }).status(200);
    } catch (error) {
        console.log("Error in getMessages controller:", error);
        res.json({
            success: false,
            message: error.message
        }).status(500);
    }
}

export const sendMessage = async (req, res) => {
    const { message } = req.body;
    
    if (!message) {
        return res.json({
            success: false,
            message: "Please enter a message"
        }).status(400);
    }

    try {
        const senderId = req.user._id;
        const receiverId = req.params.id;

        const newMessage = await Message.create({
            sender: senderId,
            receiver: receiverId,
            message: message,
            hour: new Date().getHours(),
            minute: new Date().getMinutes()
        });

        // socket implementation
        const io = getIO();
        const onlineUsers = getConnectedUsers();

        const receiverSocketId = onlineUsers[receiverId];
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.json({
            success: true,
        }).status(200);
    } catch (error) {
        console.log("Error in sendMessage controller:", error);
        res.json({
            success: false,
            message: error.message
        }).status(500);
    }
}

