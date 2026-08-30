import { User } from "../models/user/user.model.js";
import { AppError } from "../lib/AppError.js";
import { Block } from "../models/friends/block.model.js";
import { Friend } from "../models/friends/friend.model.js";

export const getAllFriendsService = async (currentUserId) => {
    const blockRecords = await Block.find({
        $or: [{ user: currentUserId }, { blocked: currentUserId }],
    });

    const blockedUserIds = blockRecords.map((b) =>
        b.user.toString() === currentUserId.toString()
            ? b.blocked.toString()
            : b.user.toString(),
    );

    const friendships = await Friend.find({
        status: "accepted",
        $or: [{ sender: currentUserId }, { receiver: currentUserId }],
    })
        .populate("sender", "username name about avatar")
        .populate("receiver", "username name about avatar")
        .sort({ acceptedAt: -1 });

    const friends = friendships
        .map((friendship) => {
            if (
                friendship.receiver._id.toString() == currentUserId.toString()
            ) {
                return friendship.sender;
            } else {
                return friendship.receiver;
            }
        })
        .filter((friend) => !blockedUserIds.includes(friend._id.toString()));

    return friends;
};

export const deleteFriendService = async (currentUserId, targetUserId) => {
    if (currentUserId === targetUserId) {
        throw new AppError("Invalid Token", 401);
    }
    await Friend.findOneAndDelete({
        $or: [
            { sender: currentUserId, receiver: targetUserId },
            { sender: targetUserId, receiver: currentUserId },
        ],
    });
};

export const getIncomingRequestsService = async (currentUserId) => {
    const incomingRequests = await Friend.find({
        receiver: currentUserId,
        status: "pending",
    })
        .populate("sender", "username name about avatar")
        .sort({ createdAt: -1 });

    return incomingRequests;
};

export const getOutgoingRequestsService = async (currentUserId) => {
    const outgoingRequests = await Friend.find({
        sender: currentUserId,
        status: "pending",
    })
        .populate("receiver", "username name about avatar")
        .sort({ createdAt: -1 });

    return outgoingRequests;
};

export const sendRequestService = async (currentUserId, targetUserId) => {
    if (currentUserId.toString() === targetUserId.toString()) {
        throw new AppError(
            "You cannot send a friend request to yourself.",
            400,
        );
    }

    const blockExists = await Block.findOne({
        user: targetUserId,
        blocked: currentUserId,
    });

    if (blockExists) {
        throw new AppError("you cannot interact with this person", 403);
    }

    const existingRelationship = await Friend.findOne({
        $or: [
            { sender: currentUserId, receiver: targetUserId },
            { sender: targetUserId, receiver: currentUserId },
        ],
    });

    if (existingRelationship) {
        if (existingRelationship.status === "accepted") {
            throw new AppError("You are already friends.", 400);
        }

        if (existingRelationship.status === "pending") {
            if (
                existingRelationship.receiver.toString() ===
                currentUserId.toString()
            ) {
                existingRelationship.status = "accepted";
                existingRelationship.acceptedAt = Date.now();
                await existingRelationship.save();
                return existingRelationship.toObject();
            }

            if (
                existingRelationship.sender.toString() ===
                currentUserId.toString()
            ) {
                throw new AppError("Friend request already sent.", 400);
            }
        }
    }

    const newRelationship = await Friend.create({
        sender: currentUserId,
        receiver: targetUserId,
        status: "pending",
    });

    await newRelationship.populate("receiver", "name avatar username about");

    return newRelationship.toObject();
};

export const acceptRequestService = async (currentUserId, requestId) => {
    const friendRequest = await Friend.findById(requestId).populate(
        "sender",
        "name avatar username about",
    );

    if (!friendRequest) {
        throw new AppError("Relationship doesn't exist", 404);
    }

    if (friendRequest.sender.toString() === currentUserId.toString()) {
        throw new AppError("Invalid request", 400);
    }

    if (friendRequest.status === "accepted") {
        throw new AppError("You are already friends.", 400);
    }

    friendRequest.status = "accepted";
    friendRequest.acceptedAt = Date.now();
    await friendRequest.save();

    return friendRequest.toObject();
};

export const rejectRequestService = async (currentUserId, requestId) => {
    const friendRequest = await Friend.findById(requestId);

    if (!friendRequest) {
        throw new AppError("Relationship doesnt exist", 404);
    }

    if (friendRequest.receiver.toString() !== currentUserId.toString()) {
        throw new AppError("Invalid request", 400);
    }

    await Friend.deleteOne({ _id: requestId });
};

export const cancelRequestService = async (currentUserId, requestId) => {
    const friendRequest = await Friend.findById(requestId);

    if (!friendRequest) {
        throw new AppError("Relationship doesnt exist", 404);
    }

    if (friendRequest.sender.toString() !== currentUserId.toString()) {
        throw new AppError("Invalid request", 400);
    }

    if (friendRequest.status === "accepted") {
        throw new AppError("your request has already accepted", 400);
    }

    await Friend.deleteOne({ _id: requestId });
};

export const getBlockedUsersService = async (currentUserId) => {
    const blockedUsers = await Block.find({
        user: currentUserId,
    }).populate("blocked", "name username avatar about");

    return blockedUsers;
};

export const blockUserService = async (currentUserId, targetUserId) => {
    try {
        const blockUser = await Block.create({
            user: currentUserId,
            blocked: targetUserId,
        });

        return blockUser.toObject();
    } catch (error) {
        if (error.code === 11000) {
            throw new AppError("This user is already blocked.", 400);
        }
        throw error;
    }
};

export const unblockUserService = async (currentUserId, targetUserId) => {
    const isBlocked = await Block.findOneAndDelete({
        user: currentUserId,
        blocked: targetUserId,
    });

    if (!isBlocked) {
        throw new AppError("You haven't blocked this user before", 404);
    }
};

export const searchUsersService = async (query, currentUserId) => {
    const users = await User.find({
        _id: { $ne: currentUserId },
        $or: [
            { username: { $regex: `${query}`, $options: "i" } },
            { name: { $regex: `${query}`, $options: "i" } },
        ],
    })
        .limit(10)
        .select("username name avatar about");

    return users;
};
