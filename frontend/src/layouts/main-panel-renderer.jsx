import MainEmptyPanel from "@/components/panels/main-empty-panel";
import { useChat } from "@/hooks/use-chat";
import ConversationPanel from "@/components/panels/conversation-panel";
import { useApp } from "@/hooks/use-app";

const MainPanelRenderer = () => {
    const activeChatId = useChat((state) => state.activeChatId);
    const conversationLoading = useChat((state) => state.conversationLoading);

    const activeSidePanel = useApp((state) => state.activeSidePanel);

    const validChatPanels = ["chatsPanel", "archivedChatsPanel"];

    if (!validChatPanels.includes(activeSidePanel)) {
        return <MainEmptyPanel />;
    }

    if (activeChatId || conversationLoading) {
        return (
            <div className="h-full">
                <ConversationPanel />
            </div>
        );
    }

    return <MainEmptyPanel />;
};

export default MainPanelRenderer;
