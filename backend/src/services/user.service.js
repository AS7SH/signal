import { AppError } from "../lib/AppError.js";
import { User } from "../models/user/user.model.js";

export const searchUsersService = async (query) => {
    const users = await User.find({
        $or: [
            { username: { $regex: `${query}`, $options: "i" } },
            { name: { $regex: `${query}`, $options: "i" } },
        ],
    })
        .limit(2)
        .select("username name avatar about");

    return users;
};

export const getUserService = async (username) => {
    const user = await User.find({
        username,
    }).select("username name avatar about");

    if (!user) {
        throw new AppError("User not found");
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
        throw new AppError("User not found");
    }

    return;
};
