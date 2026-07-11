import { createTransporter } from "../config/mail.config.js";
import { HTML_OTP_Email } from "./templates.js";

export const sendOTPMail = async (user) => {
    const HTML_Template = HTML_OTP_Email(
        user.username,
        "OTP to verify the email",
        "15 Minutes",
        user.verificationToken,
    );

    const transporter = createTransporter();

    await transporter.sendMail({
        to: user.email,
        subject: "OTP to Verify the Email",
        html: HTML_Template,
    });
};
