import { Router } from "express";
import {
    deleteAccountController,
    loginController,
    logoutController,
    refreshTokenController,
    sendVerifyEmailController,
    signupController,
    verifyEmailController,
} from "../controllers/auth.controller.js";
import { ProtectRoute } from "../middlewares/ProtectRoute.middleware.js";

const authRoutes = Router()
    .post("/signup", signupController)
    .post("/refresh", refreshTokenController)
    .post("/login", loginController)
    .post("/logout", logoutController)
    .use(ProtectRoute)
    .post("/verify-email", verifyEmailController)
    .post("/send-verify-email", sendVerifyEmailController)
    .delete("/delete", deleteAccountController);

export default authRoutes;
