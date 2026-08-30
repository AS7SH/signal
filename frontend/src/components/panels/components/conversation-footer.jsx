import PlusIcon from "@/assets/plus-icon";
import SendIcon from "@/assets/send-icon";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useApp } from "@/hooks/use-app";
import { useChat } from "@/hooks/use-chat";
import { useMessage } from "@/hooks/use-message";
import { useEffect, useRef } from "react";

const ConversationFooter = () => {
    const message = useMessage((state) => state.message);
    const setMessage = useMessage((state) => state.setMessage);
    const sendMessage = useMessage((state) => state.sendMessage);
    const conversation = useChat((state) => state.conversation);
    const activeSidePanel = useApp((state) => state.activeSidePanel);

    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [conversation, activeSidePanel]);

    const handleSendMessage = () => {
        if (message.trim() === "") {
            return;
        }
        sendMessage();
    };

    const handleEnterKey = (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className="w-full px-8 py-4 bg-transparent">
            <div className="flex items-end w-full bg-secondary rounded-[24px] px-2 py-1.5 min-h-12">
                <Button
                    variant="ghost"
                    size="icon"
                    className="shrink-0 rounded-full text-muted-foreground hover:text-foreground h-10 w-10 mb-0.5"
                >
                    <PlusIcon className="size-6" />
                </Button>

                <Textarea
                    ref={inputRef}
                    placeholder="Type a message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleEnterKey}
                    rows={1}
                    className="custom-scrollbar min-h-3! max-h-47 bg-transparent! border-0 my-1 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 px-3 py-2 text-[15px] placeholder:text-muted-foreground w-full resize-none overflow-y-auto custom-scrollbar"
                />

                <Button
                    disabled={message.trim() === ""}
                    variant="ghost"
                    size="icon"
                    className="shrink-0 rounded-full text-muted-foreground hover:text-foreground h-10 w-10 mb-0.5"
                    onClick={handleSendMessage}
                >
                    <SendIcon className="size-6" />
                </Button>
            </div>
        </div>
    );
};

export default ConversationFooter;
