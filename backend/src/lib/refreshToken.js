import jwt from "jsonwebtoken";
import { ENV } from "../config/env.config.js";

export const setRefreshTokenCookie = (res, refreshToken) => {
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: ENV.NODE_ENV === "production" ? true : false,
        sameSite: ENV.NODE_ENV === "production" ? "strict" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
};

export const generateRefreshToken = (_id) => {
    const refreshToken = jwt.sign({ _id }, ENV.JWT_REFRESH_SECRET, {
        expiresIn: "7d",
    });

    return refreshToken;
};

export const generateAccessToken = (_id) => {
    const accessToken = jwt.sign({ _id }, ENV.JWT_ACCESS_SECRET, {
        expiresIn: "15m",
    });

    return accessToken;
};
