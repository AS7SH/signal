import { z } from "zod";

export const sendMessageSchema = z.object({
    message: z.string().min(1).optional(),
    image: z.string().min(5).optional(),
    replyTo: z.string().min(5).optional(),
});

export const editMessageSchema = z.object({
    message: z.string().min(1),
});
