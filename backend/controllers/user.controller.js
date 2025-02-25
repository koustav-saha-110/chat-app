import User from "../models/user.model.js";

export const getUsers = async (req, res) => {
    try {
        const users = await User.find({
            _id: { $ne: req.user._id },
        }).select("_id name profilePic");

        res.json({
            success: true,
            users
        }).status(200);
    } catch (error) {
        console.error("Error in getUsers controller:", error);
        res.json({
            success: false,
            message: error.message
        }).status(500);
    }
}

export const searchUsers = async (req, res) => {
    try {
        const users = await User.find({
            name: { $regex: req.params.query, $options: "i" },
            _id: { $ne: req.user._id },
        }).select("_id name profilePic age");

        res.json({
            success: true,
            users
        }).status(200);
    } catch (error) {
        console.error("Error in searchUsers controller:", error);
        res.json({
            success: false,
            message: error.message
        }).status(500);
    }
}
