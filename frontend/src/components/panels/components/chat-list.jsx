import { ItemGroup } from "@/components/ui/item";
import { useChat } from "@/hooks/use-chat";
import ChatItem from "./chat-item";
import { useAuth } from "@/hooks/use-auth";
import { useApp } from "@/hooks/use-app";
import { Empty, EmptyContent, EmptyHeader } from "@/components/ui/empty";

const ChatList = () => {
    const searchQuery = useApp((state) => state.searchQuery);
    const user = useAuth((state) => state.user);

    const activeSidePanel = useApp((state) => state.activeSidePanel);
    const chatsListLoading = useChat((state) => state.chatsListLoading);

    const normalChatsList = useChat((state) => state.normalChatsList) || [];
    const archiveChatsList = useChat((state) => state.archiveChatsList) || [];

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
                    {resultedChats?.map((item, index) => (
                        <ChatItem chat={item} key={index} />
                    ))}
                </ItemGroup>
            )}
        </div>
    );
};

export default ChatList;
