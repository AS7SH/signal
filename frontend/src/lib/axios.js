import axios from "axios";

const SERVER_URL =
    import.meta.env.MODE === "development"
        ? import.meta.env.VITE_API_URL + "/api"
        : "";

const API = axios.create({
    baseURL: SERVER_URL,
    timeout: 10000,
    withCredentials: true,
});

API.interceptors.request.use(
    async (config) => {
        const { useAuth } = await import("@/hooks/use-auth");
        const { accessToken } = useAuth.getState();

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => Promise.reject(error),
);

API.interceptors.response.use(
    (response) => response,
    async (error) => {
        const { statusCode } = getErrData(error);
        if (statusCode === 401) {
            const { useAuth } = await import("@/hooks/use-auth");
            useAuth.getState().logout();
        }
        return Promise.reject(error);
    },
);

export const getResData = (res) => {
    const payload = res?.data || {};

    return {
        success: payload.success ?? true,
        message: payload.message || "Success",
        data: payload.data || null,
    };
};

export const getErrData = (err) => {
    if (err?.response?.data) {
        const backendError = err.response.data;
        return {
            success: false,
            message: backendError.message || "Something went wrong",
            errors: backendError.errors || [],
            statusCode: err.response.status,
        };
    }

    return {
        success: false,
        message: err?.message || "Network Error: Could not reach the server",
        errors: [],
        statusCode: null,
    };
};

export default API;
