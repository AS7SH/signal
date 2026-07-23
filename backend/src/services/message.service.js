import { AppError } from "../lib/AppError.js";
import { Chat } from "../models/app/chat.model.js";
import { Message } from "../models/app/message.model.js";

export const sendMessageService = async (
    currentUserId,
    chatId,
    { identifier, replyTo },
) => {
    const chat = await Chat.findOne({
        _id: chatId,
        participants: currentUserId,
    });

    if (!chat) {
        throw new AppError("Chat doesn't exist");
    }

    const newMessage = await Message.create({
        chatId,
        identifier,
        sender: currentUserId,
        ...(replyTo && { replyTo }),
    });

    return newMessage.toObject();
};

export const editMessageService = async (
    currentUserId,
    messageId,
    { message: newMessageContent },
) => {
    const updatedMessage = await Message.findOneAndUpdate(
        {
            _id: messageId,
            sender: currentUserId,
        },
        {
            message: newMessageContent,
        },
        { new: true },
    );

    if (!updatedMessage) {
        throw new AppError(
            "Message not found or you don't have permission to edit it",
        );
    }

    return updatedMessage.toObject();
};

export const deleteMessageService = async (currentUserId, messageId) => {
    const message = await Message.findOneAndDelete({
        _id: messageId,
        sender: currentUserId,
    });

    if (!message) {
        throw new AppError(
            "Message not found or you don't have permission to edit it",
        );
    }

    return {};
};
