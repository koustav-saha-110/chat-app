import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

import { createServer } from "http";
import { connectDB } from "./lib/db.js";
import { initIO } from "./socket/socket.server.js";

dotenv.config();
const __dirname = path.resolve();
const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
}

const app = express();
const PORT = process.env.PORT || 8000;
const httpServer = createServer(app);
initIO(httpServer);

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json({ limit: "100mb" }));

import authRoutes from "./router/auth.route.js";
app.use('/api/auth', authRoutes);
import userRoutes from "./router/user.route.js";
app.use('/api/users', userRoutes);
import messageRoutes from "./router/message.route.js";
app.use('/api/messages', messageRoutes);
import postRoutes from "./router/post.route.js";
app.use('/api/posts', postRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});
