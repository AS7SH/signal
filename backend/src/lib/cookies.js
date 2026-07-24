import jwt from "jsonwebtoken";
import { ENV } from "../config/env.config.js";

const getRefreshTokenCookieOptions = () => ({
    httpOnly: true,
    secure: ENV.NODE_ENV === "production",
    sameSite: ENV.NODE_ENV === "production" ? "strict" : "lax",
    path: "/api/auth/refresh",
});

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

export const setRefreshTokenCookie = (res, refreshToken) => {
    res.cookie("refreshToken", refreshToken, {
        ...getRefreshTokenCookieOptions(),
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
};

export const clearRefreshTokenCookie = (res) => {
    res.clearCookie("refreshToken", getRefreshTokenCookieOptions());
};
