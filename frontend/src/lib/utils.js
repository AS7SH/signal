import { useApp } from "@/hooks/use-app";
import { useChat } from "@/hooks/use-chat";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export const getChatArchiveStatus = () => {
    return useApp.getState().activeSidePanel === "archivedChatsPanel";
};
