import { getErrData } from "@/lib/axios";
import { addToast } from "@/lib/toast";
import axios from "axios";
import { create } from "zustand";

export const useApp = create((set, get) => ({
    activeSidePanel: "chatsPanel",
    searchQuery: "",

    selectedFile: null,
    previewURL: null,
    fileStatus: "idle",

    imageURL: null,

    setSearchQuery: (query) => set({ searchQuery: query }),
    setActiveSidePanel: (panel) => set({ activeSidePanel: panel }),

    setSelectedFile: (file) => set({ selectedFile: file }),
    setPreviewURL: (URL) => set({ previewURL: URL }),
    setFileStatus: (status) => set({ fileStatus: status }),

    setFileEmpty: () =>
        set({ selectedFile: null, previewURL: null, fileStatus: "idle" }),

    uploadImageToCloudinary: async (uploadPreset) => {
        set({ imageURL: null });
        try {
            const formData = new FormData();
            formData.append("file", get().selectedFile);
            formData.append("upload_preset", uploadPreset);

            const res = await axios.post(
                "https://api.cloudinary.com/v1_1/dz1eu88sj/image/upload",
                formData,
            );

            const actualImageUrl = res.data.secure_url;
            return actualImageUrl;
        } catch (error) {
            const { message } = getErrData(error);
            addToast({
                description: message,
                type: "error",
                priority: "high",
            });
        }
    },
}));
