import { Chat } from "../models/app/chat.model.js";
import { Friend } from "../models/friends/friend.model.js";
import { User } from "../models/user/user.model.js";
import { Message } from "../models/app/message.model.js";
import { AppError } from "../lib/AppError.js";

export const getUserChatsService = async (currentUserId) => {
    const user = await User.findById(currentUserId);
    if (!user) throw new AppError("the user doesnt exist", 404);

    let { archivedChatsIds } = user;
    archivedChatsIds = new Set(archivedChatsIds);

    const chats = await Chat.find({
        participants: {
            $in: [currentUserId],
        },
    })
        .populate("participants", "name avatar")
        .populate({
            path: "lastMessage",
            populate: {
                path: "sender",
                select: "name avatar",
            },
        })
        .sort({ updatedAt: -1 });

    const normalChats = chats.filter((chat) => !archivedChatsIds.has(chat._id));
    const archivedChats = chats.filter((chat) =>
        archivedChatsIds.has(chat._id),
    );

    return { normalChats, archivedChats };
};

export const createChatService = async (currentUserId, participantId) => {
    const existingOtherUser = await User.findById(participantId);
    if (!existingOtherUser) throw new AppError("the user doesnt exist", 404);

    const existingRelationship = await Friend.findOne({
        $or: [
            { sender: currentUserId, receiver: participantId },
            { sender: participantId, receiver: currentUserId },
        ],
    });

    if (!existingRelationship) {
        throw new AppError("You are not friend with this person", 400);
    }

    const existingChat = await Chat.findOne({
        participants: {
            $all: [currentUserId, participantId],
            $size: 2,
        },
    }).populate("participants", "name avatar");

    if (existingChat) {
        return existingChat;
    }

    const chat = await Chat.create({
        participants: [currentUserId, participantId],
        createdBy: currentUserId,
    });

    return chat;
};

export const getSingleChatService = async (currentUserId, chatId) => {
    const chat = await Chat.findOne({
        _id: chatId,
        participants: {
            $in: [currentUserId],
        },
    }).populate("participants", "name avatar");

    if (!chat) {
        throw new AppError("Couldn't find the chat", 404);
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
        chat: chat,
        messages: messages,
    };

    return data;
};

export const deleteChatService = async (currentUserId, chatId) => {
    const chat = await Chat.findOne({
        _id: chatId,
        participants: currentUserId,
    });

    if (!chat) {
        throw new AppError("couldn't find the chat", 404);
    }

    if (chat.isGroup) {
        const isCreator =
            chat.createdBy.toString() === currentUserId.toString();

        if (!isCreator) {
            throw new AppError(
                "You've got no previlage to delete the group",
                403,
            );
        }
    }

    await chat.deleteOne();
};

export const createGroupChatService = async (currentUserId, body) => {
    const { participantIds, groupName } = body;
    let chat;
    let allParticipantsIds = [];

    if (participantIds?.length <= 1) {
        throw new AppError("No. of. participants must be atleast 2", 400);
    }

    allParticipantsIds = [currentUserId, ...participantIds];

    chat = await Chat.create({
        participants: allParticipantsIds,
        isGroup: true,
        groupName,
        groupAdmins: [currentUserId],
        createdBy: currentUserId,
    });

    return chat;
};

export const renameGroupService = async (currentUserId, chatId, groupName) => {
    const chat = await Chat.findOne({
        _id: chatId,
        participants: currentUserId,
        isGroup: true,
    });

    if (!chat) {
        throw new AppError("couldn't find the chat", 404);
    }

    if (!chat.groupAdmins.includes(currentUserId)) {
        throw new AppError("Only Admins can change", 403);
    }

    chat.groupName = groupName;
    await chat.save();

    return chat;
};

export const addToGroupService = async (
    currentUserId,
    chatId,
    targetUserId,
) => {
    const targetUser = await User.findById(targetUserId);
    if (!targetUser) {
        throw new AppError("user doesn't exists", 404);
    }

    const chat = await Chat.findOne({
        _id: chatId,
        participants: currentUserId,
    });
    if (!chat) {
        throw new AppError("couldn't find the chat", 404);
    }

    if (!chat.isGroup) {
        throw new AppError("This is not a group chat", 400);
    }

    if (!chat.groupAdmins.includes(currentUserId)) {
        throw new AppError("You are not group admin", 403);
    }

    if (chat.participants.includes(targetUserId)) {
        throw new AppError("user is already in the group", 400);
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

    return updatedChat;
};

export const removeFromGroupService = async (
    currentUserId,
    chatId,
    targetUserId,
) => {
    const targetUser = await User.findById(targetUserId);
    if (!targetUser) {
        throw new AppError("user doesn't exists", 404);
    }

    const chat = await Chat.findOne({
        _id: chatId,
        participants: currentUserId,
    });
    if (!chat) {
        throw new AppError("couldn't find the chat", 404);
    }

    if (!chat.isGroup) {
        throw new AppError("This is not a group chat", 400);
    }

    if (!chat.groupAdmins.includes(currentUserId)) {
        throw new AppError("You are not group admin", 403);
    }

    if (
        chat.groupAdmins.includes(targetUserId) &&
        chat.groupAdmins.length === 1
    ) {
        throw new AppError("Cannot remove the last group admin", 400);
    }

    if (!chat.participants.includes(targetUserId)) {
        throw new AppError("user is not in the group", 404);
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

    return updatedChat;
};

export const archiveChatService = async (currentUserId, chatId) => {
    const user = await User.findById(currentUserId);
    if (!user) throw new AppError("the user doesnt exist", 404);

    const chat = await Chat.findById(chatId);
    if (!chat) throw new AppError("the chat doesnt exist", 404);

    user.archivedChatsIds.addToSet(chatId);
    await user.save();
    return user;
};

export const unArchiveChatService = async (currentUserId, chatId) => {
    const user = await User.findById(currentUserId);
    if (!user) throw new AppError("the user doesnt exist", 404);

    const chat = await Chat.findById(chatId);
    if (!chat) throw new AppError("the chat doesnt exist", 404);

    user.archivedChatsIds.pull(chatId);
    await user.save();
    return user;
};
