import API, { getErrData } from "@/lib/axios";
import { addToast } from "@/lib/toast";
import { create } from "zustand";
import { useChat } from "./use-chat";

export const useMessage = create((set, get) => ({
    message: "",

    setMessage: (message) => set({ message }),

    sendMessageLoading: false,

    sendMessage: async () => {
        set({ sendMessageLoading: true });
        try {
            const activeChatId = useChat.getState().activeChatId;
            const res = await API.post(`message/${activeChatId}/send`, {
                message: get().message,
            });
            set({ message: "" });
        } catch (error) {
            const { message } = getErrData(error);
            addToast({
                description: message,
                type: "error",
                priority: "high",
            });
        } finally {
            set({ sendMessageLoading: false });
        }
    },
}));
