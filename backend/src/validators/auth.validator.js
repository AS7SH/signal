import z from "zod";

const emailSchema = z.email("Invalid Email address").lowercase().min(5).trim();
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
const passwordSchema = z
    .string()
    .min(6)
    .max(50)
    .trim()
    .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_\-+=])[A-Za-z\d@$!%*?&#^()_\-+=]{8,64}$/,
        "Invalid Password",
    );
const otpSchema = z.string().min(6);

export const signupValidator = z.object({
    username: usernameSchema,
    name: nameSchema,
    email: emailSchema,
    password: passwordSchema,
});

export const loginValidator = z.object({
    identifier: z.union([emailSchema, usernameSchema]),
    password: z.string().min(6).max(50).trim(),
});

export const OTPvalidator = z.object({
    otp: otpSchema,
});
