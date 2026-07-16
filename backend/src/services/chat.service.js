import { Chat } from "../models/app/chat.model.js";
import { Friend } from "../models/friends/friend.model.js";
import { User } from "../models/user/user.model.js";
import { Message } from "../models/app/message.model.js";

export const getUserChatsService = async (currentUserId) => {
    const chats = await Chat.find({
        participants: {
            $in: [currentUserId],
        },
    })
        .populate("participants", "name avatar")
        .populate({
            path: "message",
            populate: {
                path: "sender",
                select: "name avatar",
            },
        })
        .sort({ updatedAt: -1 });

    return chats.toObject();
};

export const createChatService = async (currentUserId, body) => {
    const { participantId } = body;

    const existingOtherUser = await User.findById(participantId);
    if (!existingOtherUser) throw new AppError("the user doesnt exist");

    const existingRelationship = await Friend.findOne({
        $or: [
            { sender: currentUserId, receiver: participantId },
            { sender: participantId, receiver: currentUserId },
        ],
    });

    if (!existingRelationship) {
        throw new AppError("You are not friend with this person");
    }

    const existingChat = await Chat.findOne({
        participants: {
            $all: [currentUserId, participantId],
            $size: 2,
        },
    }).populate("participants", "name avatar");

    if (existingChat) {
        return existingChat.toObject();
    }

    const chat = await Chat.create({
        participants: [currentUserId, participantId],
        createdBy: currentUserId,
    });

    return chat.toObject();
};

export const getSingleChatService = async (currentUserId, chatId) => {
    const chat = await Chat.findOne({
        _id: chatId,
        participants: {
            $in: [currentUserId],
        },
    }).populate("participants", "name avatar");

    if (!chat) {
        throw new AppError("Couldn't find the chat");
    }

    const messages = await Message.find({
        chatId,
    })
        .populate("sender", "name avatar")
        .populate({
            path: "replyTo",
            select: "content image sender",
            populate: {
                path: "sender",
                select: "name avatar",
            },
        });

    const data = {
        chat: chat.toObject(),
        messages: messages.toObject(),
    };

    return data;
};

export const deleteChatService = async (currentUserId, chatId) => {
    const chat = await Chat.findOne({
        chatId,
        participants: currentUserId,
    });

    if (!chat) {
        throw new AppError("couldn't find the chat");
    }

    if (chat.isGroup) {
        const isCreator =
            chat.createdBy.toString() === currentUserId.toString();

        if (!isCreator) {
            throw new AppError("You've got no previlage to delete the group");
        }
    }

    await chat.deleteOne();
};

export const createGroupChatService = async (currentUserId, body) => {
    const { participantIds, groupName } = body;
    let chat;
    let allParticipantsIds = [];

    if (participantIds?.length <= 1) {
        throw new AppError("No. of. participants must be atleast 2");
    }

    allParticipantsIds = [currentUserId, ...participantIds];

    chat = await Chat.create({
        participants: allParticipantsIds,
        isGroup: true,
        groupName,
        groupAdmin: [currentUserId],
        createdBy: currentUserId,
    });

    return chat.toObject();
};

export const renameGroupService = async (currentUserId, chatId, groupName) => {
    const chat = await Chat.findOne({
        _id: chatId,
        participants: currentUserId,
    });

    if (!chat) {
        throw new AppError("couldn't find the chat");
    }

    if (chat.isGroup && chat.groupAdmins.includes(currentUserId)) {
        chat.groupName = groupName;
        await chat.save();
    }

    return chat.toObject();
};

export const addToGroupService = async (
    currentUserId,
    chatId,
    targetUserId,
) => {
    const targetUser = await User.findById(targetUserId);
    if (!targetUser) {
        throw new AppError("user doesn't exists");
    }

    const chat = await Chat.findOne({
        _id: chatId,
        participants: currentUserId,
    });
    if (!chat) {
        throw new AppError("couldn't find the chat");
    }

    if (!chat.isGroup) {
        throw new AppError("This is not a group chat");
    }

    if (!chat.groupAdmins.includes(currentUserId)) {
        throw new AppError("You are not group admin");
    }

    if (chat.participants.includes(targetUserId)) {
        throw new AppError("user is already in the group");
    }

    const updatedChat = await Chat.findByIdAndUpdate(
        chatId,
        {
            $addToSet: {
                participants: targetUserId,
            },
        },
        { new: true },
    );

    return updatedChat.toObject();
};

export const removeFromGroupService = async (
    currentUserId,
    chatId,
    targetUserId,
) => {
    const targetUser = await User.findById(targetUserId);
    if (!targetUser) {
        throw new AppError("user doesn't exists");
    }

    const chat = await Chat.findOne({
        _id: chatId,
        participants: currentUserId,
    });
    if (!chat) {
        throw new AppError("couldn't find the chat");
    }

    if (!chat.isGroup) {
        throw new AppError("This is not a group chat");
    }

    if (!chat.groupAdmins.includes(currentUserId)) {
        throw new AppError("You are not group admin");
    }

    if (
        chat.groupAdmins.includes(targetUserId) &&
        chat.groupAdmins.length === 1
    ) {
        throw new AppError("Cannot remove the last group admin");
    }

    if (!chat.participants.includes(targetUserId)) {
        throw new AppError("user is not in the group");
    }

    const updatedChat = await Chat.findByIdAndUpdate(
        chatId,
        {
            $pull: {
                participants: targetUserId,
                groupAdmins: targetUserId,
            },
        },
        { new: true },
    );

    return updatedChat.toObject();
};
