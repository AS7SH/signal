import CreateChatIcon from "@/assets/create-chat-icon";
import { Button } from "../ui/button";
import SearchBar from "./components/search-bar";
import { useApp } from "@/hooks/use-app";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import MoreOptionsButton from "./components/more-options-button";
import { ScrollArea } from "../ui/scroll-area";
import ChatList from "./components/chat-list";

const ChatsPanel = () => {
    const activeSidePanel = useApp((state) => state.activeSidePanel);

    let title;
    if (activeSidePanel === "chatsPanel") {
        title = "Chats";
    } else if (activeSidePanel === "archivedChatsPanel") {
        title = "Archived Chats";
    }

    return (
        <div className="flex justify-start items-center w-full h-full flex-col">
            <div className="p-5 w-full gap-2 flex items-center justify-start flex-col">
                <div className="flex justify-between items-center w-full">
                    <h1 className="text-xl">{title}</h1>
                    <div className="flex justify-center items-center gap-2">
                        <Tooltip>
                            <TooltipTrigger
                                render={
                                    <Button
                                        size="icon-lg"
                                        variant="ghost"
                                        onClick={() =>
                                            useApp
                                                .getState()
                                                .setActiveSidePanel(
                                                    "createChatPanel",
                                                )
                                        }
                                    >
                                        <CreateChatIcon className="size-5" />
                                    </Button>
                                }
                            />
                            <TooltipContent>Create Chat</TooltipContent>
                        </Tooltip>
                        <MoreOptionsButton moreOptionsFor="chatsPanel" />
                    </div>
                </div>
                <div className="w-full">
                    <SearchBar type="message" />
                </div>
            </div>
            <div className="w-full flex-1 overflow-hidden px-2">
                <ScrollArea className="w-full h-full rounded-md px-3 pr-4">
                    <ChatList />
                </ScrollArea>
            </div>
        </div>
    );
};

export default ChatsPanel;
