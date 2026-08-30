import { AppError } from "../lib/AppError.js";
import { User } from "../models/user/user.model.js";

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
    { username, name, about, avatar },
    _id,
) => {
    const updatedUser = await User.findOneAndUpdate(
        {
            _id,
        },
        { username, name, about, avatar },
        { new: true },
    );

    return updatedUser;
};

export const deleteUserService = async (_id) => {
    const user = await User.findByIdAndDelete(_id);

    if (!user) {
        throw new AppError("User not found", 404);
    }

    return;
};
