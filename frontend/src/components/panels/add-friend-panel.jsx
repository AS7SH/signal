import { useFriend } from "@/hooks/use-friend";
import { ScrollArea } from "../ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import MoreOptionsButton from "./components/more-options-button";
import SearchBar from "./components/search-bar";
import AddFriendList from "./components/add-friend-list";

const AddFriendPanel = () => {
    const setTabForAddFriend = useFriend((state) => state.setTabForAddFriend);
    const tabForAddFriend = useFriend((state) => state.tabForAddFriend);

    const title = "Add Friend";

    return (
        <div className="flex justify-start items-center w-full h-full flex-col">
            <div className="p-5 w-full gap-2 flex items-center justify-start flex-col">
                <div className="flex justify-between items-center w-full">
                    <h1 className="text-xl">{title}</h1>
                    <div className="flex justify-center items-center gap-2">
                        <MoreOptionsButton moreOptionsFor="chatsPanel" />
                    </div>
                </div>

                <Tabs
                    value={tabForAddFriend}
                    defaultValue="createChat"
                    onValueChange={(val) => setTabForAddFriend(val)}
                    className="w-full flex justify-center pb-3"
                >
                    <TabsList
                        variant="line"
                        className="w-full grid grid-cols-3"
                    >
                        <TabsTrigger value="addFriend">Find Users</TabsTrigger>
                        <TabsTrigger value="incomingRequests">
                            Incoming
                        </TabsTrigger>
                        <TabsTrigger value="outgoingRequests">
                            Outgoing
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
                <div className="w-full">
                    <SearchBar type="message" />
                </div>
            </div>
            <div className="w-full flex-1 overflow-hidden px-2">
                <ScrollArea className="w-full h-full rounded-md px-3 pr-4">
                    <AddFriendList />
                </ScrollArea>
            </div>
        </div>
    );
};

export default AddFriendPanel;
