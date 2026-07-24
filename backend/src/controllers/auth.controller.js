import { sendResponse } from "../lib/sendResponse.js";
import {
    clearRefreshTokenCookie,
    setRefreshTokenCookie,
} from "../lib/cookies.js";
import { asyncHandler } from "../middlewares/AsyncHandler.middleware.js";
import {
    deleteAccountService,
    loginService,
    logoutService,
    refreshService,
    sendVerifyEmailService,
    signupService,
    verifyEmailService,
} from "../services/auth.service.js";
import {
    loginValidator,
    OTPvalidator,
    signupValidator,
} from "../validators/auth.validator.js";
import { ENV } from "../config/env.config.js";
import { AppError } from "../lib/AppError.js";

export const signupController = asyncHandler(async (req, res) => {
    const body = signupValidator.parse(req.body);

    const result = await signupService(body);

    setRefreshTokenCookie(res, result.user.refreshToken);

    return sendResponse(res, true, 200, "User created Successfully", result);
});

export const verifyEmailController = asyncHandler(async (req, res) => {
    const body = OTPvalidator.parse(req.body);

    const user = await verifyEmailService(body, req.user);

    return sendResponse(res, true, 200, "User verified Successfully", user);
});

export const sendVerifyEmailController = asyncHandler(async (req, res) => {
    const user = await sendVerifyEmailService(req.user);

    return sendResponse(res, true, 200, "Verification mail has sent", user);
});

export const loginController = asyncHandler(async (req, res) => {
    const body = loginValidator.parse(req.body);

    const result = await loginService(body);

    setRefreshTokenCookie(res, result.user.refreshToken);

    return sendResponse(res, true, 200, "Logged in Successfully", result);
});

export const logoutController = asyncHandler(async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
        await logoutService(refreshToken);
    }

    clearRefreshTokenCookie(res);

    return sendResponse(res, true, 200, "Logged out Successfully");
});

export const refreshTokenController = asyncHandler(async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) throw new AppError("Unauthorized", 401);

    const result = await refreshService(refreshToken);

    setRefreshTokenCookie(res, result.user.refreshToken);

    return sendResponse(res, true, 200, "Generated Access token", result);
});

export const deleteAccountController = asyncHandler(async (req, res) => {
    await deleteAccountService(req.user);

    clearRefreshTokenCookie(res);

    return sendResponse(res, true, 200, "Account successfully deleted");
});
