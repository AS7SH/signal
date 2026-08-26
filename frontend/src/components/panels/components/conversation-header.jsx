import CloseIcon from "@/assets/close-icon";
import ProfileImage from "@/components/profile-image";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/use-auth";
import { useChat } from "@/hooks/use-chat";

const ConversationHeader = () => {
    const { chat, messages } = useChat((state) => state.conversation);
    const user = useAuth((state) => state.user);

    const otherUser = chat.participants?.find((item) => item._id !== user._id);

    const otherUsers =
        chat.participants?.filter((item) => item._id !== user._id) || [];

    const imgSrc = chat.isGroup ? chat.avatar : otherUser?.avatar;

    const title = chat.isGroup ? chat.groupName : otherUser?.name;

    const description = otherUsers.map((item) => item.name).join(" , ");

    return (
        <div className="border-b h-18 w-full flex justify-between items-center px-4 py-2.5">
            <div className="flex justify-start gap-4 items-center">
                <ProfileImage src={imgSrc} alt={title} />
                <div className="flex flex-col justify-center items-start gap-1">
                    <h1 className="line-clamp-1 flex w-fit items-center gap-2 text-sm leading-snug font-medium underline-offset-4">
                        {title}
                    </h1>
                    {chat.isGroup && (
                        <h3 className="line-clamp-1 text-left text-sm leading-normal font-light text-muted-foreground group-data-[size=xs]/item:text-xs [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary">
                            {description}
                        </h3>
                    )}
                </div>
            </div>
            <div className="flex justify-start gap-4 items-center">
                {/* <MoreOptionsButton  /> */}

                <Tooltip>
                    <TooltipTrigger
                        render={
                            <Button
                                variant="ghost"
                                onClick={() => {
                                    useChat.getState().closeChat();
                                }}
                                size="icon-lg"
                            >
                                <CloseIcon className="size-5" />
                            </Button>
                        }
                    />
                    <TooltipContent>Close Chat</TooltipContent>
                </Tooltip>
            </div>
        </div>
    );
};

export default ConversationHeader;
