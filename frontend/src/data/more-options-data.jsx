import AddFriendIcon from "@/assets/add-friend-icon";
import ArchivedIcon from "@/assets/archived-icon";
import ArrowDownIcon from "@/assets/arrow-down-icon";
import ArrowRightIcon from "@/assets/arrow-right-icon";
import BinIcon from "@/assets/bin-icon";
import BlockIcon from "@/assets/block-icon";
import CheckIcon from "@/assets/check-icon";
import CloseIcon from "@/assets/close-icon";
import CreateChatIcon from "@/assets/create-chat-icon";
import LogoutIcon from "@/assets/logout-icon";
import MinusIcon from "@/assets/minus-icon";
import MoreOptionsIcon from "@/assets/more-options-icon";
import PlusIcon from "@/assets/plus-icon";
import StarIcon from "@/assets/star-icon";
import UnarchivedIcon from "@/assets/unarchived-icon";
import { useApp } from "@/hooks/use-app";
import { useAuth } from "@/hooks/use-auth";
import { useChat } from "@/hooks/use-chat";
import { useFriend } from "@/hooks/use-friend";

export const moreOptionsData = () => {
    return {
        chatsPanel: {
            icon: MoreOptionsIcon,
            tooltip: true,
            style: true,
            getOptions: () => [
                {
                    title: "New Friend",
                    icon: AddFriendIcon,
                    name: "addFriendPanel",
                },
                {
                    title: "New Chat",
                    icon: CreateChatIcon,
                    name: "createChatPanel",
                },
                {
                    title: "Starred Messages",
                    icon: StarIcon,
                    hasSeparater: true,
                    name: "starredChatsPanel",
                },
                {
                    title: "Logout",
                    icon: LogoutIcon,
                    type: "destructive",
                    actionPresent: true,
                    action: () => useAuth.getState().logout(),
                },
            ],
        },
        chatItem: {
            icon: ArrowDownIcon,
            tooltip: false,
            style: false,
            getOptions: (chatId) => {
                const isArchive =
                    useApp.getState().activeSidePanel === "archivedChatsPanel";
                return [
                    {
                        title: isArchive ? "Unarchive Chat" : "Archive Chat",
                        icon: isArchive ? UnarchivedIcon : ArchivedIcon,
                        name: isArchive ? "unarchiveChat" : "archiveChat",
                        hasSeparater: true,
                        action: () =>
                            isArchive
                                ? useChat.getState().unarchiveChat(chatId)
                                : useChat.getState().archiveChat(chatId),
                    },
                    {
                        title: "Delete Chat",
                        icon: BinIcon,
                        name: "deleteChat",
                        type: "destructive",
                        action: () => useChat.getState().deleteChat(chatId),
                    },
                ];
            },
        },
        friendItem: {
            icon: ArrowDownIcon,
            tooltip: false,
            style: false,
            getOptions: (friendId) => {
                const isBlockedUser = useFriend.getState().showBlockedUsers;
                return [
                    {
                        title: isBlockedUser
                            ? "Unblock Friend"
                            : "Block Friend",
                        icon: BlockIcon,
                        name: isBlockedUser ? "unblockFriend" : "blockFriend",
                        action: () =>
                            isBlockedUser
                                ? useFriend.getState().unblockUser(friendId)
                                : useFriend.getState().blockUser(friendId),
                    },
                ];
            },
        },
        addFriendItem: {
            icon: ArrowDownIcon,
            tooltip: false,
            style: false,
            getOptions: (friendId) => {
                const state = useFriend.getState();

                const isAlreadyFriend = (state.allFriends || []).some(
                    (friend) => friend._id === friendId,
                );
                const isInIncoming = (state.incomingFriendRequests || []).some(
                    (f) => f.sender._id === friendId,
                );
                const isInOutgoing = (state.outgoingFriendRequests || []).some(
                    (f) => f.receiver._id === friendId,
                );

                return [
                    {
                        title: "Friend Request",
                        icon: PlusIcon,
                        name: "friendRequest",
                        hide: isAlreadyFriend || isInIncoming || isInOutgoing,
                        action: () =>
                            useFriend.getState().sendFriendRequest(friendId),
                    },
                    {
                        title: "View Incoming Requests",
                        icon: ArrowRightIcon,
                        name: "viewIncomingRequests",
                        hide: !isInIncoming,
                        action: () =>
                            useFriend
                                .getState()
                                .setTabForAddFriend("incomingRequests"),
                    },
                    {
                        title: "View Outgoing Requests",
                        icon: ArrowRightIcon,
                        name: "viewOutingRequests",
                        hide: !isInOutgoing,
                        action: () =>
                            useFriend
                                .getState()
                                .setTabForAddFriend("outgoingRequests"),
                    },
                ];
            },
        },
        incomingRequestItem: {
            icon: ArrowDownIcon,
            tooltip: false,
            style: false,
            getOptions: (requestId) => [
                {
                    title: "Accept Request",
                    icon: CheckIcon,
                    name: "acceptRequest",
                    action: () =>
                        useFriend.getState().acceptFriendRequest(requestId),
                },
                {
                    title: "Reject Request",
                    icon: CloseIcon,
                    name: "rejectRequest",
                    type: "destructive",
                    action: () =>
                        useFriend.getState().rejectFriendRequest(requestId),
                },
            ],
        },
        outgoingRequestItem: {
            icon: ArrowDownIcon,
            tooltip: false,
            style: false,
            getOptions: (requestId) => {
                return [
                    {
                        title: "Cancel Request",
                        icon: MinusIcon,
                        name: "cancelRequest",
                        type: "destructive",
                        action: () =>
                            useFriend.getState().cancelFriendRequest(requestId),
                    },
                ];
            },
        },
    };
};
