import { ScrollArea } from "../ui/scroll-area";
import SearchBar from "./components/search-bar";
import MoreOptionsButton from "./components/more-options-button";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { useFriend } from "@/hooks/use-friend";
import UserList from "./components/user-list";
import { useChat } from "@/hooks/use-chat";

const CreateChatPanel = () => {
    const friends = useFriend((state) => state.friends);
    const setCreateWhich = useChat((state) => state.setCreateWhich);

    return (
        <div className="flex justify-start items-center w-full h-full flex-col">
            <div className="p-5 w-full gap-2 flex items-center justify-start flex-col">
                <div className="flex justify-between items-center w-full">
                    <h1 className="text-xl">Create Chat</h1>

                    <div className="flex justify-center items-center gap-2">
                        <MoreOptionsButton moreOptionsFor="chatsPanel" />
                    </div>
                </div>
                <div className="w-full">
                    <Tabs
                        defaultValue="createChat"
                        className="flex justify-center items-center pb-2"
                    >
                        <TabsList variant="line">
                            <TabsTrigger
                                value="createChat"
                                onClick={() => setCreateWhich("createChat")}
                            >
                                Create Chat
                            </TabsTrigger>
                            <TabsTrigger
                                value="createGroup"
                                onClick={() => setCreateWhich("createGroup")}
                            >
                                Create Group
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>
                <div className="w-full">
                    <SearchBar type="message" />
                </div>
            </div>
            <div className="w-full flex-1 overflow-hidden px-2">
                <ScrollArea className="w-full h-full rounded-md px-3 pr-4">
                    <UserList />
                </ScrollArea>
            </div>
        </div>
    );
};

export default CreateChatPanel;
