import { sendResponse } from "src/lib/sendResponse.js";
import { asyncHandler } from "src/middlewares/AsyncHandler.middleware.js";
import {
    deleteMessageService,
    editMessageService,
    sendMessageService,
} from "src/services/message.service.js";
import {
    editMessageSchema,
    sendMessageSchema,
} from "src/validators/message.validator.js";

export const sendMessageController = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { chatId } = req.params;
    const body = sendMessageSchema.parse(req.body);

    const response = await sendMessageService(_id, chatId, body);
    return sendResponse(res, true, 200, "sent message successfully", response);
});

export const editMessageController = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { messageId } = req.params;
    const body = editMessageSchema.parse(req.body);

    const response = await editMessageService(_id, messageId, body);
    return sendResponse(
        res,
        true,
        200,
        "updated message successfully",
        response,
    );
});

export const deleteMessageController = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { messageId } = req.params;

    const response = await deleteMessageService(_id, messageId);
    return sendResponse(res, true, 200, "deleted message successfully");
});
