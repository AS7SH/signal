import { Router } from "express";
import { ProtectRoute } from "../middlewares/ProtectRoute.middleware.js";
import {
    addToGroupController,
    createChatController,
    createGroupChatController,
    deleteChatController,
    getSingleChatController,
    getUserChatsController,
    removeFromGroupController,
    renameGroupController,
} from "../controllers/chat.controller.js";

const chatRouter = Router()
    .use(ProtectRoute)

    .get("/", getUserChatsController)
    .post("/", createChatController)
    .get("/:chatId", getSingleChatController)
    .delete("/:chatId", deleteChatController)

    .post("/group", createGroupChatController)
    .put("/group/:chatId/rename", renameGroupController)
    .put("/group/:chatId/add", addToGroupController)
    .put("/group/:chatId/remove", removeFromGroupController);

export default chatRouter;
