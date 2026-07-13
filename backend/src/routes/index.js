import { Router } from "express";
import authRoutes from "./auth.route.js";
import friendsRouter from "./friends.route.js";

const routes = Router()
    .use("/api/auth", authRoutes)
    .use("/api/friends", friendsRouter);

export default routes;
