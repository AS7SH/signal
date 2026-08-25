import { Router } from "express";
import { ProtectRoute } from "../middlewares/ProtectRoute.middleware.js";
import {
    addToGroupController,
    archiveChatController,
    createChatController,
    createGroupChatController,
    deleteChatController,
    getSingleChatController,
    getUserChatsController,
    removeFromGroupController,
    renameGroupController,
    unArchiveChatController,
} from "../controllers/chat.controller.js";

const chatRouter = Router()
    .use(ProtectRoute)

    .post("/:chatId/archive", archiveChatController)
    .post("/:chatId/un-archive", unArchiveChatController)

    .post("/group", createGroupChatController)
    .patch("/group/:chatId/rename", renameGroupController)
    .patch("/group/:chatId/add", addToGroupController)
    .patch("/group/:chatId/remove", removeFromGroupController)

    .get("/", getUserChatsController)
    .post("/:friendId", createChatController)
    .get("/:chatId", getSingleChatController)
    .delete("/:chatId", deleteChatController);

export default chatRouter;
