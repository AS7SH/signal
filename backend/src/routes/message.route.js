import { Router } from "express";
import { ProtectRoute } from "../middlewares/ProtectRoute.middleware.js";
import {
    deleteMessageController,
    editMessageController,
    sendMessageController,
} from "src/controllers/message.controller.js";

const messageRouter = Router()
    .use(ProtectRoute)

    .post("/:chatId/send", sendMessageController)
    .put("/:messageId/edit", editMessageController)
    .delete("/:messageId/delete", deleteMessageController);

// future
// .patch("/chat/:messageId/read", markMessageReadChatController)
// .patch("/group/:messageId/read", markMessageReadGroupController);

export default messageRouter;
