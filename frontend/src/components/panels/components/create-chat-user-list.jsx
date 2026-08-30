import { ItemGroup } from "@/components/ui/item";
import { useFriend } from "@/hooks/use-friend";
import { useApp } from "@/hooks/use-app";
import { useChat } from "@/hooks/use-chat";
import { useAuth } from "@/hooks/use-auth";
import ListItem from "./list-item";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import PlusIcon from "@/assets/plus-icon";
import { Checkbox } from "@/components/ui/checkbox";
import { Spinner } from "@/components/ui/spinner";
import { useState } from "react";

const UserList = () => {
    const allFriends = useFriend((state) => state.allFriends);
    const userId = useAuth((state) => state.user)._id;
    const searchQuery = useApp((state) => state.searchQuery);
    const normalChatsList = useChat((state) => state.normalChatsList);
    const archiveChatsList = useChat((state) => state.archiveChatsList);
    const createWhich = useChat((state) => state.createWhich);
    const participantsToCreateGroup = useChat(
        (state) => state.participantsToCreateGroup,
    );
    const toggleGroupParticipant = useChat(
        (state) => state.toggleGroupParticipant,
    );
    const createSingleChatLoading = useChat(
        (state) => state.createSingleChatLoading,
    );

    const [loadingUserId, setLoadingUserId] = useState(null);

    let friendsNeedingChats;

    if (createWhich === "directChat") {
        const alreadyChattedIdsNormalList = normalChatsList
            .filter((chat) => chat.isGroup === false)
            .flatMap((chat) =>
                chat.participants.map((participant) => participant._id),
            )
            .filter((participantId) => participantId !== userId);
        const alreadyChattedIdsArchiveList = archiveChatsList
            .filter((chat) => chat.isGroup === false)
            .flatMap((chat) =>
                chat.participants.map((participant) => participant._id),
            )
            .filter((participantId) => participantId !== userId);

        const alreadyChattedIds = [
            ...alreadyChattedIdsNormalList,
            ...alreadyChattedIdsArchiveList,
        ];

        friendsNeedingChats = allFriends.filter(
            (friend) => !alreadyChattedIds.includes(friend._id.toString()),
        );
    }
    let resultedUsers =
        createWhich === "directChat" ? friendsNeedingChats : allFriends;

    resultedUsers = resultedUsers.filter(
        (friend, index) =>
            friend.name.toLowerCase().includes(searchQuery) ||
            friend.username.toLowerCase().includes(searchQuery),
    );

    return (
        <div>
            <ItemGroup className="gap-1">
                {resultedUsers?.map((user) => (
                    <ListItem
                        key={user._id}
                        id={`user-to-create-chat-${user._id}`}
                        avatar={user.avatar}
                        title={user.name}
                        onClick={() => toggleGroupParticipant(user._id)}
                        trailingWidget={
                            createWhich === "directChat" ? (
                                <Tooltip>
                                    <TooltipTrigger
                                        render={
                                            <Button
                                                size="icon-xl"
                                                variant="ghost"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setLoadingUserId(user._id);
                                                    useChat
                                                        .getState()
                                                        .createSingleChat(
                                                            user._id,
                                                        );
                                                }}
                                            >
                                                {createSingleChatLoading &&
                                                loadingUserId === user._id ? (
                                                    <Spinner size={3} />
                                                ) : (
                                                    <PlusIcon className="size-5" />
                                                )}
                                            </Button>
                                        }
                                    />
                                    <TooltipContent>create Chat</TooltipContent>
                                </Tooltip>
                            ) : (
                                <Checkbox
                                    checked={participantsToCreateGroup.has(
                                        user._id.toString(),
                                    )}
                                    variant="ghost"
                                    htmlFor={`create-group-checkbox-${user._id}`}
                                    onClick={() =>
                                        toggleGroupParticipant(user._id)
                                    }
                                >
                                    <PlusIcon className="size-5" />
                                </Checkbox>
                            )
                        }
                    />
                ))}
            </ItemGroup>
        </div>
    );
};

export default UserList;
