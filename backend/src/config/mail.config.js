import nodemailer from "nodemailer";
import { ENV } from "./env.config.js";

export const createTransporter = () => {
    return nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: ENV.SMTP_USER,
            pass: ENV.SMTP_USER_PASS,
        },
    });
};
