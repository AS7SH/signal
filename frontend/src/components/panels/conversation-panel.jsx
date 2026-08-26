import ConversationHeader from "./components/conversation-header";
import ConversationContent from "./components/conversation-content";
import ConversationFooter from "./components/conversation-footer";
import { useChat } from "@/hooks/use-chat";
import { Spinner } from "../ui/spinner";

const ConversationPanel = () => {
    const conversationLoading = useChat((state) => state.conversationLoading);

    return (
        <main className="flex flex-col w-full h-full overflow-hidden">
            {conversationLoading ? (
                <>
                    <div className="flex h-full w-full items-center justify-center">
                        <Spinner className="size-8" />
                    </div>
                </>
            ) : (
                <>
                    <div className="shrink-0">
                        <ConversationHeader />
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        <ConversationContent />
                    </div>
                </>
            )}

            <div className="shrink-0">
                <ConversationFooter />
            </div>
        </main>
    );
};

export default ConversationPanel;
