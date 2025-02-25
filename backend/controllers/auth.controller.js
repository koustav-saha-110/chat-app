import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";

const generateToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
}

export const signup = async (req, res) => {
    const { name, age, email, profilePic, password } = req.body;

    if (!name || !age || !email || !profilePic || !password) {
        return res.json({
            success: false,
            message: "Please fill all the fields"
        }).status(400);
    }

    if (password.length < 6) {
        return res.json({
            success: false,
            message: "Password should be at least 6 characters long"
        }).status(400);
    }

    if (Number(age) < 18) {
        return res.json({
            success: false,
            message: "Age should be at least 18"
        }).status(400);
    }

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.json({
                success: false,
                message: "Account already exists"
            }).status(400);
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const cloudResponse = await cloudinary.uploader.upload(profilePic);

        const user = await User.create({
            name,
            age,
            email,
            profilePic: cloudResponse?.secure_url,
            password: hashedPassword
        });

        const token = generateToken(user);

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000
        });

        return res.json({
            success: true,
            user: {
                _id: user._id,
                name: user.name,
                age: user.age,
                email: user.email,
                profilePic: user.profilePic,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }
        }).status(201);
    } catch (error) {
        console.error("Error in signup controller:", error);
        res.json({
            success: false,
            message: "Internal Server Error"
        }).status(500);
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({
            success: false,
            message: "Please fill all the fields"
        }).status(400);
    }

    try {
        const user = await User.findOne({ email: email }).select("+password");

        if (!user) {
            return res.json({
                success: false,
                message: "Account does not exist"
            }).status(400);
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({
                success: false,
                message: "Invalid credentials"
            }).status(400);
        }

        const token = generateToken(user);

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000
        });

        return res.json({
            success: true,
            user: {
                _id: user._id,
                name: user.name,
                age: user.age,
                email: user.email,
                profilePic: user.profilePic,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }
        }).status(200);
    } catch (error) {
        console.error("Error in login controller:", error);
        res.json({
            success: false,
            message: "Internal Server Error"
        }).status(500);
    }
}

export const logout = async (_, res) => {
    res.clearCookie("token");
    return res.json({
        success: true,
    }).status(200);
}

export const update = async (req, res) => {
    const { name, profilePic } = req.body;

    try {
        const currentUser = await User.findById(req.user._id);

        if (name) currentUser.name = name;

        if (profilePic) {
            const cloudResponse = await cloudinary.uploader.upload(profilePic);
            currentUser.profilePic = cloudResponse?.secure_url;
        }

        await currentUser.save();

        res.json({
            success: true,
            user: currentUser
        }).status(200);
    } catch (error) {
        console.error("Error in update controller:", error);
        res.json({
            success: false,
            message: "Internal Server Error"
        }).status(500);
    }
}
