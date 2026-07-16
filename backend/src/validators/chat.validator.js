import z from "zod";

export const createChatSchema = z.object({
    participantId: z.string().trim().min(1),
});

export const createGroupSchema = z.object({
    isGroup: z.boolean().optional(),
    participantIds: z.array(z.string().trim().min(1)).optional(),
    groupName: z.string().trim().min(1).optional(),
});

export const chatIdSchema = z.object({
    id: z.string().trim().min(1),
});
