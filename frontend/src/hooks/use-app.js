import { create } from "zustand";

export const useApp = create((set, get) => ({
    activeSidePanel: "chatsPanel",
    searchQuery: "",

    setSearchQuery: (query) => set({ searchQuery: query }),
    setActiveSidePanel: (panel) => set({ activeSidePanel: panel }),
}));
