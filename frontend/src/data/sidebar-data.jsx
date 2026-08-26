import AddFriendIcon from "@/assets/add-friend-icon";
import ArchivedIcon from "@/assets/archived-icon";
import CreateChatIcon from "@/assets/create-chat-icon";
import FriendsIcon from "@/assets/friends-icon";
import MessageIcon from "@/assets/message-icon";
import AddFriendPanel from "@/components/panels/add-friend-panel";
import ChatsPanel from "@/components/panels/chats-panel";
import CreateChatPanel from "@/components/panels/create-chat-panel";
import FriendsPanel from "@/components/panels/friends-panel";
import UserProfilePanel from "@/components/panels/user-profile-panel";
import ProfileImage from "@/components/profile-image";

import { useAuth } from "@/hooks/use-auth";

export const sidebarData = () => {
    return {
        user: useAuth.getState().user,
        navMain: [
            {
                title: "Chats",
                icon: MessageIcon,
                panel: ChatsPanel,
                name: "chatsPanel",
            },
            {
                title: "Create Chat",
                icon: CreateChatIcon,
                hasSeparator: true,
                panel: CreateChatPanel,
                name: "createChatPanel",
            },
            {
                title: "Archived Chats",
                icon: ArchivedIcon,
                panel: ChatsPanel,
                name: "archivedChatsPanel",
            },
            {
                title: "Friends",
                icon: FriendsIcon,
                panel: FriendsPanel,
                name: "friendsPanel",
            },
            {
                title: "Add a Friend",
                icon: AddFriendIcon,
                panel: AddFriendPanel,
                name: "addFriendPanel",
            },
        ],
        navSecondary: [
            {
                title: "User Profile",
                Icon: () => AvatarLink(),
                panel: UserProfilePanel,
                name: "userProfilePanel",
            },
        ],
    };
};

const AvatarLink = () => {
    const data = sidebarData();
    return <ProfileImage src={data.user?.avatar} alt={data.user?.name} />;
};
