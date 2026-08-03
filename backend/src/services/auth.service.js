import { ENV } from "../config/env.config.js";
import { sendOTPMail } from "../mails/sendMail.js";
import { AppError } from "../lib/AppError.js";
import { getOTP } from "../lib/getOTP.js";
import { generateAccessToken, generateRefreshToken } from "../lib/cookies.js";
import { User } from "../models/user/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userToObj = (user) => {
    return user._doc;
};

export const checkUsernameService = async (username) => {
    const user = await User.findOne({
        username,
    });

    if (!user) {
        return "user not found";
    }

    return "user found";
};

export const signupService = async (body) => {
    const { username, name, email, password } = body;

    const isEmailExists = await User.findOne({ email });
    if (isEmailExists) throw new AppError("Email already Exists", 409);

    const isUserNameExists = await User.findOne({ username });
    if (isUserNameExists) throw new AppError("Username already Exists", 409);

    const hashPass = await bcrypt.hash(password, 10);
    const verificationToken = getOTP();

    const user = await User.create({
        username,
        email,
        name,
        password: hashPass,
        verificationToken,
        verificationTokenExpiresAt: Date.now() + 15 * 60 * 1000,
    });
    user.refreshToken = generateRefreshToken(user._id);
    await user.save();

    const accessToken = generateAccessToken(user._id);
    const userData = userToObj(user);

    return { user: userData, accessToken };
};

export const verifyEmailService = async (body, reqUser) => {
    const { otp } = body;
    const { _id } = reqUser;

    const user = await User.findOne({ _id });

    if (!user) throw new AppError("User not found", 404);

    if (user.verificationToken !== otp) throw new AppError("Invalid OTP", 400);

    if (
        !user.verificationTokenExpiresAt ||
        Date.now() > user.verificationTokenExpiresAt
    ) {
        throw new AppError("OTP Expired, click resend", 400);
    }

    user.isVerified = true;
    user.verificationToken = null;
    user.verificationTokenExpiresAt = null;
    await user.save();

    return user;
};

export const sendVerifyEmailService = async (reqUser) => {
    const verificationToken = getOTP();
    const { _id } = reqUser;
    const user = await User.findById(_id);

    if (!user) throw new AppError("User not found", 404);

    user.verificationToken = verificationToken;
    user.verificationTokenExpiresAt = Date.now() + 15 * 60 * 1000;
    await user.save();

    await sendOTPMail(user);

    return user;
};

export const loginService = async (body) => {
    const { identifier, password } = body;
    const identifiedItem = identifier.includes("@") ? "email" : "username";

    const user = await User.findOne({
        [identifiedItem]: identifier,
    }).select("+password");

    if (!user) throw new AppError("Invalid email/username or password", 401);

    const isPasswordSame = await bcrypt.compare(password, user.password);

    if (!isPasswordSame) throw new AppError("email / password is wrong", 401);

    user.lastLogin = Date.now();
    user.refreshToken = generateRefreshToken(user._id);
    await user.save();

    const accessToken = generateAccessToken(user._id);
    const userData = userToObj(user);

    return { user: userData, accessToken };
};

export const logoutService = async (refreshToken) => {
    await User.updateOne(
        { refreshToken: refreshToken },
        { $unset: { refreshToken: "" } },
    );
};

export const refreshService = async (refreshToken) => {
    let decoded;
    try {
        decoded = jwt.verify(refreshToken, ENV.JWT_REFRESH_SECRET);
    } catch (jwtError) {
        throw new AppError("RefreshTokenExpired", 401);
    }

    const { _id } = decoded;

    const user = await User.findById(_id);

    if (!user) throw new AppError("User not found", 404);

    if (refreshToken !== user.refreshToken) {
        user.refreshToken = undefined;
        await user.save();
        throw new AppError("Unauthorized", 401);
    }

    user.refreshToken = generateRefreshToken(user._id);
    await user.save();

    const accessToken = generateAccessToken(user._id);
    const userData = userToObj(user);

    console.log(accessToken);

    return { user: userData, accessToken };
};

export const deleteAccountService = async (user) => {
    await User.deleteOne({ _id: user._id, email: user.email });
};
