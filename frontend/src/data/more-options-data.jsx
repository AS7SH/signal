import AddFriendIcon from "@/assets/add-friend-icon";
import ArchivedIcon from "@/assets/archived-icon";
import ArrowDownIcon from "@/assets/arrow-down-icon";
import BinIcon from "@/assets/bin-icon";
import CreateChatIcon from "@/assets/create-chat-icon";
import LogoutIcon from "@/assets/logout-icon";
import MoreOptionsIcon from "@/assets/more-options-icon";
import StarIcon from "@/assets/star-icon";
import UnarchivedIcon from "@/assets/unarchived-icon";
import { useAuth } from "@/hooks/use-auth";
import { useChat } from "@/hooks/use-chat";
import { getChatArchiveStatus } from "@/lib/utils";

export const moreOptionsData = ({ chatId }) => {
    return {
        chatsPanel: {
            icon: MoreOptionsIcon,
            tooltip: true,
            style: true,
            options: [
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
            options: [
                {
                    title: `${getChatArchiveStatus(chatId) ? "Unarchive Chat" : "Archive Chat"}`,
                    icon: getChatArchiveStatus(chatId)
                        ? UnarchivedIcon
                        : ArchivedIcon,
                    name: `${getChatArchiveStatus(chatId) ? "unarchiveChat" : "archiveChat"}`,
                    hasSeparater: true,
                    action: () =>
                        getChatArchiveStatus(chatId)
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
            ],
        },
    };
};
