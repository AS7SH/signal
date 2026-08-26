import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bubble, BubbleContent, BubbleGroup } from "@/components/ui/bubble";
import { Marker, MarkerContent } from "@/components/ui/marker";
import {
    Message,
    MessageAvatar,
    MessageContent,
    MessageHeader,
} from "@/components/ui/message";
import { useAuth } from "@/hooks/use-auth";
import { useChat } from "@/hooks/use-chat";
import { useEffect } from "react";

const ConversationContent = () => {
    const { chat, messages } = useChat((state) => state.conversation);
    const user = useAuth((state) => state.user);

    const groupedMessages = [];
    let currentGroup = null;

    messages.forEach((msg) => {
        if (!currentGroup || currentGroup.sender._id !== msg.sender._id) {
            if (currentGroup) {
                groupedMessages.push(currentGroup);
            }
            currentGroup = {
                sender: msg.sender,
                isMe: msg.sender._id === user._id,
                messages: [msg],
            };
        } else {
            currentGroup.messages.push(msg);
        }
    });
    if (currentGroup) {
        groupedMessages.push(currentGroup);
    }

    useEffect(() => {
        console.log(groupedMessages);
    }, []);

    return (
        <div className="flex flex-col h-full w-full p-4">
            {messages.length === 0 ? (
                <div className="flex flex-1 justify-center items-center">
                    <Marker variant="separator" className="w-2xl">
                        <MarkerContent>Start a Conversation</MarkerContent>
                    </Marker>
                </div>
            ) : (
                <div className="flex flex-col gap-4 justify-end">
                    {groupedMessages.map((group, index) => (
                        <Message
                            key={`message-group-${index}`}
                            align={group.isMe ? "end" : "start"}
                        >
                            {!group.isMe && chat.isGroup && (
                                <MessageAvatar>
                                    <Avatar>
                                        <AvatarImage
                                            src={group.sender.avatar}
                                        />
                                        <AvatarFallback>
                                            {group.sender.name.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                </MessageAvatar>
                            )}
                            <MessageContent>
                                {!group.isMe && (
                                    <MessageHeader>
                                        {group.sender.name}
                                    </MessageHeader>
                                )}
                                <BubbleGroup>
                                    {group.messages.map((msg) => (
                                        <Bubble
                                            variant={
                                                group.isMe ? "default" : "muted"
                                            }
                                            key={msg._id}
                                        >
                                            <BubbleContent>
                                                {msg.message}
                                            </BubbleContent>
                                        </Bubble>
                                    ))}
                                </BubbleGroup>
                            </MessageContent>
                        </Message>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ConversationContent;
