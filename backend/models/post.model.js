import mongoose from "mongoose";
const Schema = mongoose.Schema;

const postSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: "User" },
    mediaType: { type: String, required: true, enum: ["image", "video"] },
    mediaUrl: { type: String, required: true },
    caption: { type: String, default: "" },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    time: { type: String, required: true },
}, { timestamps: true });

const Post = mongoose.model("Post", postSchema);
export default Post;
