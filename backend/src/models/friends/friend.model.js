import mongoose from "mongoose";

const friendSchema = new mongoose.Schema(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        receiver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "accepted"],
        },
        acceptedAt: {
            type: Date,
            default: null,
        },
    },
    { timestamps: true },
);

friendSchema.index({ sender: 1, receiver: 1 });
friendSchema.index({ status: 1 });

export const Friend = mongoose.model("Friend", friendSchema);
