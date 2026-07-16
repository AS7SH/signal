import { Router } from "express";
import authRoutes from "./auth.route.js";
import friendsRouter from "./friends.route.js";
import chatRouter from "./chat.route.js";

const routes = Router()
    .use("/api/auth", authRoutes)
    .use("/api/friends", friendsRouter)
    .use("/api/chat", chatRouter);

export default routes;
