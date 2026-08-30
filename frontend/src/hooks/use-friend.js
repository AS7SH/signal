import API, { getErrData, getResData } from "@/lib/axios";
import { addToast } from "@/lib/toast";
import { create } from "zustand";

export const useFriend = create((set, get) => ({
    allFriends: null,
    incomingFriendRequests: null,
    outgoingFriendRequests: null,
    blockedFriends: null,

    searchResultedUsers: null || [],

    showBlockedUsers: false,

    tabForAddFriend: "addFriend",

    //get
    allFriendsLoading: false,
    incomingFrndReqLoading: false,
    outgoingFrndReqLoading: false,
    blockedUsersLoading: false,
    searchResultedUsersLoading: false,

    sendFriendRequestLoadingId: null,
    acceptFriendRequestLoadingId: null,
    rejectFriendRequestLoadingId: null,
    cancelFriendRequestLoadingId: null,
    unblockUserLoadingId: null,
    blockUserLoadingId: null,

    toggleShowBlockedUsers: () =>
        set((state) => {
            return { showBlockedUsers: !state.showBlockedUsers };
        }),

    clearSearchUsers: () => {
        set({ searchResultedUsers: [] });
    },

    setTabForAddFriend: (tab) => {
        set({ tabForAddFriend: tab });
    },

    getAllFriends: async () => {
        set({ allFriendsLoading: true });
        try {
            const res = await API.get("/friends");
            const { data } = getResData(res);
            set({ allFriends: data });
        } catch (error) {
            const { message } = getErrData(error);
            addToast({ description: message, type: "error" });
        } finally {
            set({ allFriendsLoading: false });
        }
    },

    getIncomingFrndReq: async () => {
        set({ IncomingFrndReqLoading: true });
        try {
            const res = await API.get("/friends/requests/incoming");
            const { data } = getResData(res);
            set({ incomingFriendRequests: data });
            console.log("incomingFriendRequests");
            console.log(data);
        } catch (error) {
            const { message } = getErrData(error);
            addToast({ description: message, type: "error" });
        } finally {
            set({ incomingFrndReqLoading: false });
        }
    },

    getOutgoingFrndReq: async () => {
        set({ OutgoingFrndReqLoading: true });
        try {
            const res = await API.get("/friends/requests/outgoing");
            const { data } = getResData(res);
            set({ outgoingFriendRequests: data });
            console.log("outgoing");
            console.log(data);
        } catch (error) {
            const { message } = getErrData(error);
            addToast({ description: message, type: "error" });
        } finally {
            set({ outgoingFrndReqLoading: false });
        }
    },

    getBlockedUsers: async () => {
        set({ blockedUsersLoading: true });
        try {
            const res = await API.get("/friends/blocked");
            const { data } = getResData(res);
            const refinedData = data.map((friend) => friend.blocked);

            console.log("getBlockedUsers");
            console.log(refinedData);

            set({ blockedFriends: refinedData });
        } catch (error) {
            const { message } = getErrData(error);
            addToast({ description: message, type: "error" });
        } finally {
            set({ blockedUsersLoading: false });
        }
    },

    blockUser: async (friendId) => {
        set({ blockUserLoadingId: friendId });
        try {
            await API.post(`/friends/block/${friendId}`);

            set((state) => {
                const userBeingBlocked = state.allFriends.find(
                    (friend) => friend._id === friendId,
                );

                const updatedFriends = state.allFriends.filter(
                    (friend) => friend._id !== friendId,
                );

                const updatedBlockedFriends = userBeingBlocked
                    ? [...(state.blockedFriends || []), userBeingBlocked]
                    : state.blockedFriends;

                return {
                    allFriends: updatedFriends,
                    blockedFriends: updatedBlockedFriends,
                };
            });
        } catch (error) {
            const { message } = getErrData(error);
            addToast({ description: message, type: "error" });
        } finally {
            set({ blockUserLoadingId: null });
        }
    },

    unblockUser: async (friendId) => {
        set({ unblockUserLoadingId: friendId });
        try {
            await API.delete(`/friends/unblock/${friendId}`);
            set((state) => {
                const userBeingUnblocked = (state.blockedFriends || []).find(
                    (user) => user._id === friendId,
                );

                const updatedBlockedFriends = (
                    state.blockedFriends || []
                ).filter((user) => user._id !== friendId);

                const updatedAllFriends = userBeingUnblocked
                    ? [...(state.allFriends || []), userBeingUnblocked]
                    : state.allFriends;

                return {
                    blockedFriends: updatedBlockedFriends,
                    allFriends: updatedAllFriends,
                };
            });
        } catch (error) {
            const { message } = getErrData(error);
            addToast({ description: message, type: "error" });
        } finally {
            set({ unblockUserLoadingId: null });
        }
    },

    searchUsersWithQuery: async (query) => {
        set({ searchResultedUsersLoading: true });
        try {
            const res = await API.get(`/friends/search/${query}`);
            const { data } = getResData(res);

            console.log("searchUsersWithQuery");
            console.log(data);
            set({ searchResultedUsers: data });
        } catch (error) {
            const { message } = getErrData(error);
            addToast({
                description: message,
                type: "error",
                priority: "high",
            });
        } finally {
            set({ searchResultedUsersLoading: false });
        }
    },

    sendFriendRequest: async (friendId) => {
        set({ sendFriendRequestLoadingId: friendId });
        try {
            const res = await API.post(`/friends/requests/${friendId}`);
            const { data } = getResData(res);

            set((state) => ({
                outgoingFriendRequests: [...state.outgoingFriendRequests, data],
            }));
        } catch (error) {
            const { message } = getErrData(error);
            addToast({
                description: message,
                type: "error",
                priority: "high",
            });
        } finally {
            set({ sendFriendRequestLoadingId: null });
        }
    },

    acceptFriendRequest: async (requestId) => {
        set({ acceptFriendRequestLoadingId: requestId });
        try {
            const res = await API.patch(
                `/friends/requests/${requestId}/accept`,
            );
            const { data } = getResData(res);

            set((state) => ({
                incomingFriendRequests: (
                    state.incomingFriendRequests || []
                ).filter((req) => req._id !== requestId),
                allFriends: [...state.allFriends, data.sender],
            }));
        } catch (error) {
            const { message } = getErrData(error);
            addToast({
                description: message,
                type: "error",
                priority: "high",
            });
        } finally {
            set({ acceptFriendRequestLoadingId: null });
        }
    },

    rejectFriendRequest: async (requestId) => {
        set({ rejectFriendRequestLoadingId: requestId });
        try {
            await API.patch(`/friends/requests/${requestId}/reject`);

            set((state) => ({
                incomingFriendRequests: (
                    state.incomingFriendRequests || []
                ).filter((req) => req._id !== requestId),
            }));
        } catch (error) {
            const { message } = getErrData(error);
            addToast({
                description: message,
                type: "error",
                priority: "high",
            });
        } finally {
            set({ rejectFriendRequestLoadingId: null });
        }
    },

    cancelFriendRequest: async (requestId) => {
        set({ cancelFriendRequestLoadingId: requestId });
        try {
            await API.delete(`/friends/requests/${requestId}`);

            set((state) => ({
                outgoingFriendRequests: (
                    state.outgoingFriendRequests || []
                ).filter((req) => req._id !== requestId),
            }));
        } catch (error) {
            const { message } = getErrData(error);
            addToast({
                description: message,
                type: "error",
                priority: "high",
            });
        } finally {
            set({ cancelFriendRequestLoadingId: null });
        }
    },
}));
