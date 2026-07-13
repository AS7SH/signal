import { AppError } from "../lib/AppError.js";
import { Block } from "../models/friends/block.model.js";
import { Friend } from "../models/friends/friend.model.js";

export const getAllFriendsService = async (currentUserId) => {
    const friendships = await Friend.find({
        status: "accepted",
        $or: [{ sender: currentUserId }, { receiver: currentUserId }],
    })
        .populate("sender", "username name about avatar")
        .populate("receiver", "username name about avatar")
        .sort({ acceptedAt: -1 });

    const friends = friendships.map((friendship) => {
        if (friendship.receiver._id.toString() == userId.toString()) {
            return friendship.sender;
        } else {
            return friendship.receiver;
        }
    });

    return friends;
};

export const deleteFriendService = async (currentUserId, targetUserId) => {
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
        throw new AppError("You cannot send a friend request to yourself.");
    }

    const blockExists = await Block.findOne({
        user: targetUserId,
        blocked: currentUserId,
    });

    if (blockExists) {
        throw new AppError("you cannot interact with this person");
    }

    const existingRelationship = await Friend.findOne({
        $or: [
            { sender: currentUserId, receiver: targetUserId },
            { sender: targetUserId, receiver: currentUserId },
        ],
    });

    if (existingRelationship) {
        if (existingRelationship.status === "accepted") {
            throw new AppError("You are already friends.");
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
                throw new AppError("Friend request already sent.");
            }
        }
    }

    const newRelationship = await Friend.create({
        sender: currentUserId,
        receiver: targetUserId,
        status: "pending",
    });

    return newRelationship.toObject();
};

export const acceptRequestService = async (currentUserId, requestId) => {
    const friendRequest = await Friend.findById(requestId);

    if (!friendRequest) {
        throw new AppError("Relationship doesn't exist");
    }

    if (friendRequest.receiver.toString() !== currentUserId.toString()) {
        throw new AppError("Invalid request");
    }

    if (friendRequest.status === "accepted") {
        throw new AppError("You are already friends.");
    }

    friendRequest.status = "accepted";
    friendRequest.acceptedAt = Date.now();
    await friendRequest.save();

    return friendRequest.toObject();
};

export const rejectRequestService = async (currentUserId, requestId) => {
    const friendRequest = await Friend.findById(requestId);

    if (!friendRequest) {
        throw new AppError("Relationship doesnt exist");
    }

    if (friendRequest.receiver.toString() !== currentUserId.toString()) {
        throw new AppError("Invalid request");
    }

    await Friend.deleteOne({ _id: requestId });
};

export const cancelRequestService = async (currentUserId, requestId) => {
    const friendRequest = await Friend.findById(requestId);

    if (!friendRequest) {
        throw new AppError("Relationship doesnt exist");
    }

    if (friendRequest.sender.toString() !== currentUserId.toString()) {
        throw new AppError("Invalid request");
    }

    if (friendRequest.status === "accepted") {
        throw new AppError("your request has already accepted");
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
    const isBlocked = await Block.findOne({
        user: currentUserId,
        blocked: targetUserId,
    });

    if (isBlocked) {
        throw new AppError("The user already Blocked");
    }

    const blockUser = await Block.create({
        user: currentUserId,
        blocked: targetUserId,
    });

    await Friend.deleteOne({
        $or: [
            { sender: currentUserId, receiver: targetUserId },
            { sender: targetUserId, receiver: currentUserId },
        ],
    });

    return blockUser.toObject();
};

export const unblockUserService = async (currentUserId, targetUserId) => {
    const isBlocked = await Block.findOne({
        user: currentUserId,
        blocked: targetUserId,
    });

    if (!isBlocked) {
        throw new AppError("You haven't blocked this user before");
    }

    await Block.deleteOne({
        user: currentUserId,
        blocked: targetUserId,
    });
};
