import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import { getConnectedUsers, getIO } from "../socket/socket.server.js";
import cloudinary from "../lib/cloudinary.js";

export const getPosts = async (req, res) => {
    try {
        const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        const posts = await Post.find({ createdAt: { $gte: twentyFourHoursAgo } }).populate("author").sort({ createdAt: 1 });

        res.json({
            success: true,
            posts: posts
        }).status(200);
    } catch (error) {
        console.error("Error in getPosts controller:", error);
        res.json({
            success: false,
            message: error.message
        }).status(500);
    }
}

export const createPost = async (req, res) => {
    const { caption, mediaUrl, mediaType } = req.body;

    if (!mediaUrl || !mediaType) {
        return res.json({
            success: false,
            message: "Please provide mediaUrl and mediaType"
        }).status(400);
    }

    try {
        const currentUser = await User.findById(req.user._id);
        if (!currentUser) {
            return res.json({
                success: false,
                message: "User not found"
            }).status(404);
        }

        var mediaUrlResponse;
        try {
            mediaUrlResponse = await cloudinary.uploader.upload(mediaUrl, {
                resource_type: mediaType,
            });
        } catch (error) {
            res.json({
                success: false,
                message: error.message
            }).status(500);
        }

        if (!mediaUrlResponse) {
            return res.json({
                success: false,
                message: "Failed to upload media"
            }).status(400);
        }

        const post = await Post.create({
            author: currentUser._id,
            mediaType,
            mediaUrl: mediaUrlResponse.secure_url,
            caption: caption || "",
            time: `${new Date().getHours()}:${new Date().getMinutes()}`
        });

        post.author = currentUser;

        // socket
        const io = getIO();
        const connectedUsers = getConnectedUsers();

        for (const userId in connectedUsers) {
            if (userId !== currentUser._id.toString()) {
                const userSocketId = connectedUsers[userId];
                io.to(userSocketId).emit("newPost", {
                    post,
                    msg: `${currentUser.name} has shared a Post`
                });
            }
        }

        res.json({
            success: true,
        }).status(201);
    } catch (error) {
        console.error("Error in createPost controller:", error);
        res.json({
            success: false,
            message: error.message
        }).status(500);
    }
}

export const likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate("author");

        if (!post) {
            return res.json({
                success: false,
                message: "Post not found"
            }).status(404);
        }

        if (post.likes.includes(req.user._id)) {
            await post.updateOne({ $pull: { likes: req.user._id } });
        } else {
            post.likes.push(req.user._id);
        }

        await post.save();

        res.json({
            success: true,
            post: post
        }).status(201);
    } catch (error) {
        console.error("Error in likePost controller:", error);
        res.json({
            success: false,
            message: error.message
        }).status(500);
    }
}

export const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('author');
        if (!post) {
            return res.json({
                success: false,
                message: "Post not found"
            }).status(404);
        }

        if (post.author._id.toString() !== req.user._id.toString()) {
            return res.json({
                success: false,
                message: "You are not authorized to delete this post"
            }).status(403);
        }

        await Post.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: "Post deleted successfully"
        }).status(200);
    } catch (error) {
        console.error("Error in deletePost controller:", error);
        res.json({
            success: false,
            message: error.message
        }).status(500);
    }
}
