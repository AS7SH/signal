import { Router } from "express";
import { ProtectRoute } from "../middlewares/ProtectRoute.middleware.js";
import {
    deleteUserController,
    getUserController,
    updateUserController,
} from "../controllers/user.controller.js";

const userRouter = Router()
    .use(ProtectRoute)
    .get("/:username", getUserController)
    .patch("/:username", updateUserController)
    .delete("/delete", deleteUserController);

export default userRouter;
