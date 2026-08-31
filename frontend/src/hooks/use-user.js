import API, { getErrData, getResData } from "@/lib/axios";
import { create } from "zustand";
import { useAuth } from "./use-auth";
import { addToast } from "@/lib/toast";

export const useUser = create((set, get) => ({
    updateProfile: async (userDetails) => {
        try {
            const username = useAuth.getState().user.username;
            const res = await API.patch(`/user/${username}`, userDetails);
            const { data } = getResData(res);
            useAuth.getState().setUser(data.user);
            useAuth.getState().setAccessToken(data.accessToken);
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
