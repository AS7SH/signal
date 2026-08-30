import { ScrollArea } from "../ui/scroll-area";
import SearchBar from "./components/search-bar";
import MoreOptionsButton from "./components/more-options-button";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import UserList from "./components/create-chat-user-list";
import { useChat } from "@/hooks/use-chat";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import { Spinner } from "../ui/spinner";

const CreateChatPanel = () => {
    const setCreateWhich = useChat((state) => state.setCreateWhich);
    const createWhich = useChat((state) => state.createWhich);
    const createGroupChat = useChat((state) => state.createGroupChat);
    const createGroupChatLoading = useChat(
        (state) => state.createGroupChatLoading,
    );

    const [groupName, setGroupName] = useState("");

    return (
        <div className="flex justify-start items-center w-full h-full flex-col">
            <div className="p-5 w-full gap-2 flex items-center justify-start flex-col">
                <div className="flex justify-between items-center w-full">
                    <h1 className="text-xl font-semibold tracking-tight">
                        Create Chat
                    </h1>
                    <MoreOptionsButton moreOptionsFor="chatsPanel" />
                </div>

                <Tabs
                    defaultValue="createChat"
                    className="w-full flex justify-center pb-3"
                >
                    <TabsList
                        variant="line"
                        className="w-full grid grid-cols-2"
                    >
                        <TabsTrigger
                            value="createChat"
                            onClick={() => setCreateWhich("directChat")}
                        >
                            Direct
                        </TabsTrigger>
                        <TabsTrigger
                            value="createGroup"
                            onClick={() => setCreateWhich("groupChat")}
                        >
                            Group
                        </TabsTrigger>
                    </TabsList>
                </Tabs>

                <SearchBar type="message" />

                {createWhich === "groupChat" && (
                    <div className="flex flex-col pt-4 w-full">
                        {/* Group Name Input */}
                        <div className="w-full">
                            <Input
                                type="text"
                                placeholder="Enter group name..."
                                required
                                value={groupName}
                                onChange={(e) => setGroupName(e.target.value)}
                            />
                        </div>
                    </div>
                )}
            </div>

            <div className="flex-1 w-full p-5 overflow-hidden">
                <ScrollArea className="h-full w-full rounded-md">
                    <UserList />
                </ScrollArea>
            </div>

            {createWhich === "groupChat" && (
                <div className="w-full p-5 border-t">
                    <Button
                        className="w-full font-medium"
                        size="lg"
                        onClick={() => createGroupChat(groupName)}
                        disabled={!groupName || createGroupChatLoading}
                    >
                        Create Group
                        {createGroupChatLoading && (
                            <Spinner className="size-4" />
                        )}
                    </Button>
                </div>
            )}
        </div>
    );
};

export default CreateChatPanel;
