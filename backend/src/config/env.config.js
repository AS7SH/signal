import "dotenv/config";

export const ENV = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_USER_PASS: process.env.SMTP_USER_PASS,
    FRONTEND_ORIGIN: process.env.FRONTEND_ORIGIN,
    NODE_ENV: process.env.NODE_ENV,
};
