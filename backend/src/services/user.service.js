import { generateAccessToken } from "../lib/cookies.js";
import { AppError } from "../lib/AppError.js";
import { User } from "../models/user/user.model.js";
import bcrypt from "bcryptjs";

export const getUserService = async (username) => {
    const user = await User.find({
        username,
    }).select("username name avatar about");

    if (!user) {
        throw new AppError("User not found", 404);
    }

    return user;
};

export const updateUserService = async (
    { username, name, about, avatar, password },
    _id,
) => {
    const updateFields = {};

    if (username) updateFields.username = username;
    if (name) updateFields.name = name;
    if (about) updateFields.about = about;
    if (avatar) updateFields.avatar = avatar;
    if (password) {
        const hashPass = await bcrypt.hash(password, 10);
        updateFields.password = hashPass;
    }

    const updatedUser = await User.findOneAndUpdate(
        {
            _id,
        },
        { $set: updateFields },
        { new: true },
    );

    const accessToken = generateAccessToken(updatedUser._id);
    const userData = updatedUser._doc;

    return { user: userData, accessToken };
};

export const deleteUserService = async (_id) => {
    const user = await User.findByIdAndDelete(_id);

    if (!user) {
        throw new AppError("User not found", 404);
    }

    return;
};
