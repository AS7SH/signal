import API, { getErrData, getResData } from "@/lib/axios";
import { addToast } from "@/lib/toast";
import { create } from "zustand";
import { useApp } from "./use-app";

export const useChat = create((set, get) => ({
    activeChatId: null,

    archiveChatsIds: [],
    normalChatsList: null || [],
    archiveChatsList: null || [],
    chats: new Map(),

    createWhich: "singleChat",

    conversation: null || {},

    conversationLoading: false,
    chatsListLoading: false,
    archiveChatLoading: false,
    unarchiveChatLoading: false,
    deleteChatLoading: false,
    createSingleChatLoading: false,

    setCreateWhich: (which) => set({ createWhich: which }),

    closeChat: () => set({ activeChatId: null, conversation: null }),

    getUserChats: async () => {
        set({ chatsListLoading: true });
        try {
            const res = await API.get("/chat/");
            const { data } = getResData(res);
            set({
                normalChatsList: data.normalChats,
                archiveChatsList: data.archiveChats,
            });
            console.log("All Chats");
            console.log(data);
            console.log("Chats");
            console.log(get().chats);
        } catch (error) {
            const { message } = getErrData(error);
            addToast({
                description: message,
                type: "error",
                priority: "high",
            });
        } finally {
            set({ chatsListLoading: false });
        }
    },

    getSingleChat: async (chatId) => {
        if (get().chats.has(chatId)) {
            set({
                conversation: get().chats.get(chatId),
                activeChatId: chatId,
            });
            return;
        }

        try {
            set({ conversation: null, conversationLoading: true });

            const res = await API.get(`/chat/${chatId}`);
            const { data } = getResData(res);
            set({ conversation: data, activeChatId: chatId });
            get().chats.set(chatId, data);
        } catch (error) {
            const { message } = getErrData(error);
            addToast({
                description: message,
                type: "error",
                priority: "high",
            });
        } finally {
            set({ conversationLoading: false });
        }
    },

    createSingleChat: async (friendId) => {
        set({ createSingleChatLoading: true });
        try {
            const res = await API.post(`/chat/${friendId}`);
            const { data } = getResData(res);

            set((state) => {
                return {
                    normalChatsList: [...(state.normalChatsList || []), data],
                };
            });

            useApp.getState().setActiveSidePanel("chatsPanel");
        } catch (error) {
            const { message } = getErrData(error);
            addToast({
                description: message,
                type: "error",
                priority: "high",
            });
        } finally {
            set({ createSingleChatLoading: false });
        }
    },

    deleteChat: async (chatId) => {
        set({ deleteChatLoading: true });
        try {
            await API.delete(`/chat/${chatId}`);
            set((state) => {
                const updatedChats = new Map(state.chats);
                updatedChats.delete(chatId);

                const isActiveChat = state.activeChatId === chatId;

                return {
                    chats: updatedChats,
                    normalChatsList: (state.normalChatsList || []).filter(
                        (c) => c._id !== chatId,
                    ),
                    archiveChatsList: (state.archiveChatsList || []).filter(
                        (c) => c._id !== chatId,
                    ),
                    conversation: isActiveChat
                        ? null || {}
                        : state.conversation,
                    activeChatId: isActiveChat ? null : state.activeChatId,
                };
            });
        } catch (error) {
            const { message } = getErrData(error);
            addToast({
                description: message,
                type: "error",
                priority: "high",
            });
        } finally {
            set({ deleteChatLoading: false });
        }
    },

    archiveChat: async (chatId) => {
        set({ archiveChatLoading: true });
        try {
            await API.post(`/chat/${chatId}/archive`);
            set((state) => {
                const chatToMove = state.normalChatsList?.find(
                    (c) => c._id === chatId,
                );
                if (!chatToMove) return state;

                return {
                    normalChatsList: state.normalChatsList.filter(
                        (c) => c._id !== chatId,
                    ),
                    archiveChatsList: [
                        ...(state.archiveChatsList || []),
                        chatToMove,
                    ],
                };
            });
        } catch (error) {
            const { message } = getErrData(error);
            addToast({
                description: message,
                type: "error",
                priority: "high",
            });
        } finally {
            set({ archiveChatLoading: false });
        }
    },

    unarchiveChat: async (chatId) => {
        set({ unarchiveChatLoading: true });
        try {
            await API.post(`/chat/${chatId}/un-archive`);
            set((state) => {
                const chatToMove = state.archiveChatsList?.find(
                    (c) => c._id === chatId,
                );
                if (!chatToMove) return state;

                return {
                    archiveChatsList: state.archiveChatsList.filter(
                        (c) => c._id !== chatId,
                    ),
                    normalChatsList: [
                        ...(state.normalChatsList || []),
                        chatToMove,
                    ],
                };
            });
        } catch (error) {
            const { message } = getErrData(error);
            addToast({
                description: message,
                type: "error",
                priority: "high",
            });
        } finally {
            set({ unarchiveChatLoading: false });
        }
    },
}));
