import { ItemGroup } from "@/components/ui/item";
import { useChat } from "@/hooks/use-chat";
import { useAuth } from "@/hooks/use-auth";
import { useApp } from "@/hooks/use-app";
import { Empty, EmptyContent, EmptyHeader } from "@/components/ui/empty";
import ListItem from "./list-item";
import MoreOptionsButton from "./more-options-button";

const ChatList = () => {
    const searchQuery = useApp((state) => state.searchQuery);
    const user = useAuth((state) => state.user);

    const activeSidePanel = useApp((state) => state.activeSidePanel);
    const chatsListLoading = useChat((state) => state.chatsListLoading);

    const normalChatsList = useChat((state) => state.normalChatsList) || [];
    const archiveChatsList = useChat((state) => state.archiveChatsList) || [];

    const getSingleChat = useChat((state) => state.getSingleChat);
    const activeChatId = useChat((state) => state.activeChatId);

    const chatsList =
        activeSidePanel === "archivedChatsPanel"
            ? archiveChatsList
            : normalChatsList;

    const resultedChats = Array.isArray(chatsList)
        ? chatsList.filter((item) => {
              if (item.isGroup) {
                  return item.groupName
                      ?.toLowerCase()
                      .includes(searchQuery.toLowerCase());
              }
              const otherUser = item.participants?.find(
                  (other) => other._id !== user?._id,
              );
              return otherUser?.name
                  ?.toLowerCase()
                  .includes(searchQuery.toLowerCase());
          })
        : [];

    const getAttrFromChat = (chat) => {
        const otherUser = chat.participants.find(
            (participant) => participant._id != user._id,
        );

        const imgSrc = chat.isGroup ? chat?.avatar : otherUser?.avatar;
        const title = chat.isGroup ? chat.groupName : otherUser.name;
        const createdBy = chat.participants.filter(
            (participant) =>
                participant._id.toString() === chat.createdBy.toString(),
        )[0];
        const description = chat.isGroup
            ? chat.lastMessage
                ? `${chat.lastMessage.sender.name === user.name ? "" : chat.lastMessage.sender.name + " : "} ${chat.lastMessage.message}`
                : `${createdBy.name === user.name ? "You created the Group" : "You were added to this group by " + createdBy.name}`
            : chat.lastMessage
              ? `${chat.lastMessage.message}`
              : `Chat was initiated by ${createdBy.name}`;
        const type = chat.isGroup ? "group-chat" : "direct-chat";
        return {
            otherUserName: otherUser.name,
            imgSrc,
            title,
            description,
            type,
        };
    };

    return (
        <div>
            {chatsListLoading ? null : resultedChats.length <= 0 ? (
                <Empty>
                    <EmptyHeader>Nothing's here</EmptyHeader>
                    <EmptyContent>
                        Add friends and connect with them
                    </EmptyContent>
                </Empty>
            ) : (
                <ItemGroup className="gap-1">
                    {resultedChats?.map((chat, index) => {
                        const attr = getAttrFromChat(chat);
                        return (
                            <ListItem
                                key={index}
                                id={`${attr.type}-${chat._id}`}
                                avatar={attr.imgSrc}
                                onClick={() => getSingleChat(chat._id)}
                                title={attr.title}
                                subtitle={attr.description}
                                isActive={chat._id === activeChatId}
                                trailingWidget={
                                    <div
                                        onClick={(e) => {
                                            e.stopPropagation();
                                        }}
                                        className="absolute right-0 top-0 opacity-0 z-10 group-hover:opacity-100 transition-opacity duration-150"
                                    >
                                        <MoreOptionsButton
                                            moreOptionsFor="chatItem"
                                            id={chat._id}
                                        />
                                    </div>
                                }
                            />
                        );
                    })}
                </ItemGroup>
            )}
        </div>
    );
};

export default ChatList;
