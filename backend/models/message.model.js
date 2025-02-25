import mongoose from "mongoose";
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    sender: { type: Schema.Types.ObjectId, ref: "User" },
    receiver: { type: Schema.Types.ObjectId, ref: "User" },
    message: { type: String, required: true },
    hour: { type: String, required: true },
    minute: { type: String, required: true },
}, { timestamps: true });

const Message = mongoose.model("Message", messageSchema);
export default Message;
