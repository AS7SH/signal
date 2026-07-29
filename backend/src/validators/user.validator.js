import z from "zod";

const nameSchema = z
    .string()
    .min(5)
    .trim()
    .max(50)
    .regex(/^[\p{L}][\p{L}\s.'-]{1,98}[\p{L}]$/u, "Invalid Name");
const usernameSchema = z
    .string()
    .min(5)
    .trim()
    .max(30)
    .regex(/^[a-zA-Z][a-zA-Z0-9._]{2,29}$/, "Invalid Username");
const aboutSchema = z.string().min(1).max(50).trim();
const avatarSchema = z.string().min(5).max(30).trim();

export const updateUserValidator = z.object({
    username: usernameSchema,
    name: nameSchema,
    about: aboutSchema,
    avatar: avatarSchema,
});
