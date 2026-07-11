import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        about: {
            type: String,
            default: "Available",
            trim: true,
        },
        avatar: {
            type: String,
            default: "/avatars/default.png",
            trim: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
            select: false,
        },
        lastLogin: {
            type: Date,
            default: Date.now(),
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        refreshToken: {
            type: String,
            trim: true,
        },
        resetPassToken: String,
        resetPassTokenExpiresAt: Date,
        verificationToken: String,
        verificationTokenExpiresAt: Date,
    },
    { timestamps: true },
);

export const User = mongoose.model("User", UserSchema);
