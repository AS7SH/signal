import { Router } from "express";
import authRoutes from "./auth.route.js";
import friendsRouter from "./friends.route.js";
import chatRouter from "./chat.route.js";
import messageRouter from "./message.route.js";

const routes = Router()
    .use("/api/auth", authRoutes)
    .use("/api/friends", friendsRouter)
    .use("/api/chat", chatRouter)
    .use("/api/message", messageRouter);

export default routes;
