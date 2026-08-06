import API, { getErrData, getResData } from "@/lib/axios";
import { addToast } from "@/lib/toast";
import { create } from "zustand";

export const useAuth = create((set, get) => ({
    user: null,
    accessToken: "",
    username: "",

    isUsernameAvailable: null,

    isCheckingAuth: true,

    checkUsernameLoading: false,
    signupLoading: false,
    loginLoading: false,
    verifyEmailLoading: false,
    sendEmailLoading: false,
    logoutLoading: false,

    setUsername: (username) => set({ username, isUsernameAvailable: null }),
    setAccessToken: (token) => set({ accessToken: token }),
    // clearAuth: () => set({ accessToken: null, user: null }),

    checkUsername: async (username) => {
        set({ checkUsernameLoading: true });
        try {
            const res = await API.get(`/auth/${username}/check`);
            const { message } = getResData(res);
            if (message === "user found") {
                set({
                    isUsernameAvailable: false,
                });
            } else {
                set({ isUsernameAvailable: true });
            }
        } catch (error) {
            const { message } = getErrData(error);
            addToast({
                description: message,
                type: "error",
                priority: "high",
            });
        } finally {
            set({ checkUsernameLoading: false });
        }
    },

    signup: async (body) => {
        set({
            user: null,
            signupLoading: true,
            accessToken: "",
        });
        try {
            const res = await API.post(`/auth/signup`, body);
            const { data, message } = getResData(res);
            set({
                user: data?.user,
                accessToken: data?.accessToken,
            });
            addToast({
                description: message,
                type: "success",
            });
        } catch (error) {
            const { message } = getErrData(error);
            addToast({
                description: message,
                type: "error",
                priority: "high",
            });
        } finally {
            set({ signupLoading: false });
        }
    },

    login: async (body) => {
        set({
            user: null,
            loginLoading: true,
            accessToken: "",
        });
        try {
            const res = await API.post("/auth/login", body);
            const { data, message } = getResData(res);
            set({
                user: data?.user,
                accessToken: data?.accessToken,
            });
            addToast({
                description: message,
                type: "success",
            });
        } catch (error) {
            const { message } = getErrData(error);
            addToast({
                description: message,
                type: "error",
                priority: "high",
            });
        } finally {
            set({ loginLoading: false });
        }
    },

    sendVerifyEmail: async () => {
        set({ sendEmailLoading: true });
        try {
            const res = await API.post("/auth/send-verify-email");
            const { message } = getResData(res);
            addToast({
                description: message,
                type: "success",
            });
        } catch (error) {
            const { message } = getErrData(error);
            addToast({
                description: message,
                type: "error",
                priority: "high",
            });
        } finally {
            set({ sendEmailLoading: false });
        }
    },

    verifyEmail: async (otp) => {
        set({ verifyEmailLoading: true });
        try {
            const res = await API.post("/auth/verify-email", { otp });
            const { data, message } = getResData(res);
            set({ user: data });
            addToast({
                description: message,
                type: "success",
            });
        } catch (error) {
            const { message } = getErrData(error);
            addToast({
                description: message,
                type: "error",
                priority: "high",
            });
        } finally {
            set({ verifyEmailLoading: false });
        }
    },

    logout: async () => {
        set({ logoutLoading: true });
        try {
            const res = await API.post("/auth/logout");
            set({
                user: null,
                accessToken: null,
                username: "",
            });
        } catch (error) {
            const { message } = getErrData(error);
            addToast({
                description: message,
                type: "error",
                priority: "high",
            });
        } finally {
            set({ logoutLoading: false });
        }
    },

    refresh: async () => {
        set({ isCheckingAuth: true });
        const minimumDelay = new Promise((resolve) =>
            setTimeout(resolve, 2000),
        );
        try {
            const [res] = await Promise.all([
                API.post("/auth/refresh"),
                minimumDelay,
            ]);
            const { data } = getResData(res);
            set({ accessToken: data?.accessToken, user: data.user });
        } catch (error) {
            set({ accessToken: null, user: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },
}));
