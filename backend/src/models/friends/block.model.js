import mongoose from "mongoose";

const blockSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        blocked: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true },
);

blockSchema.index({ user: 1, blocked: 1 }, { unique: true });

export const Block = mongoose.model("Blocks", blockSchema);
