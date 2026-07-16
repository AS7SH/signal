import { sendResponse } from "../lib/sendResponse.js";
import { asyncHandler } from "../middlewares/AsyncHandler.middleware.js";
import {
    addToGroupService,
    createChatService,
    createGroupChatService,
    deleteChatService,
    getSingleChatService,
    getUserChatsService,
    removeFromGroupService,
    renameGroupService,
} from "../services/chat.service.js";
import {
    createChatSchema,
    createGroupSchema,
} from "../validators/chat.validator.js";

export const getUserChatsController = asyncHandler(async (req, res) => {
    const { _id } = req.user;

    const response = await getUserChatsService(_id);
    return sendResponse(res, true, 200, "retrieved user chats", response);
});

export const createChatController = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const body = createChatSchema(body);

    const response = await createChatService(_id, body);
    return sendResponse(res, true, 200, "created a chat", response);
});

export const getSingleChatController = asyncHandler(async (req, res) => {
    const { chatId } = req.params;
    const { _id } = req.user;

    const response = await getSingleChatService(_id, chatId);
    return sendResponse(res, true, 200, "retrieved user chat", response);
});

export const deleteChatController = asyncHandler(async (req, res) => {
    const { chatId } = req.params;
    const { _id } = req.user;

    const response = await deleteChatService(_id, chatId);
    return sendResponse(res, true, 200, "deleted the chat", response);
});

export const createGroupChatController = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const body = createGroupSchema(body);

    const response = await createGroupChatService(_id, body);
    return sendResponse(res, true, 200, "created a group", response);
});

export const renameGroupController = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { chatId } = req.params;
    const { groupName } = req.body;

    const response = await renameGroupService(_id, chatId, groupName);
    return sendResponse(res, true, 200, "renamed the chat", response);
});

export const addToGroupController = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { chatId } = req.params;
    const { participantId } = req.body;

    const response = await addToGroupService(_id, chatId, participantId);
    return sendResponse(
        res,
        true,
        200,
        "successfully added the user to group",
        response,
    );
});

export const removeFromGroupController = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { chatId } = req.params;
    const { participantId } = req.body;

    const response = await removeFromGroupService(_id, chatId, participantId);
    return sendResponse(
        res,
        true,
        200,
        "successfully added the user to group",
        response,
    );
});
