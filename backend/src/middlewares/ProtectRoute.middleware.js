import jwt from "jsonwebtoken";
import { AppError } from "../lib/AppError.js";
import { asyncHandler } from "./AsyncHandler.middleware.js";
import { ENV } from "../config/env.config.js";

export const ProtectRoute = asyncHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        throw new AppError(
            "You are not logged in. Please log in to get access.",
            401,
        );
    }

    try {
        const decoded = jwt.verify(token, ENV.JWT_ACCESS_SECRET);

        req.user = {
            _id: decoded._id,
        };
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            throw new AppError("TokenExpired", 401);
        }
        throw new AppError("Invalid token. Please log in again.", 401);
    }
});
