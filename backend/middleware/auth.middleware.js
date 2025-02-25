import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectedRoute = async (req, res, next) => {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res.json({
                success: false,
                message: "Please login first"
            }).status(401);
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.json({
                success: false,
                message: "Please login first"
            }).status(401);
        }

        const user = await User.findById(decoded.id);

        if (!user) {
            return res.json({
                success: false,
                message: "Please login first"
            }).status(401);
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Error in protectedRouter middleware:", error);
        res.json({
            success: false,
            message: error.message
        }).status(500);
    }
}


