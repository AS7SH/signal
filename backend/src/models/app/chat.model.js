import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
    {
        participants: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
        ],
        isGroup: {
            type: Boolean,
            default: false,
        },
        groupName: {
            type: String,
            default: "group",
        },
        message: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        groupAdmins: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    { timestamps: true },
);

export const Chat = mongoose.model("Chat", chatSchema);
