import MoreOptionsButton from "./components/more-options-button";
import SearchBar from "./components/search-bar";
import { ScrollArea } from "../ui/scroll-area";
import FriendsList from "./components/friends-list";
import { useFriend } from "@/hooks/use-friend";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

const FriendsPanel = () => {
    const toggleShowBlockedUsers = useFriend(
        (state) => state.toggleShowBlockedUsers,
    );

    let title = "Friends";

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
                    defaultValue="allFriends"
                    className="w-full flex justify-center pb-3"
                >
                    <TabsList
                        variant="line"
                        className="w-full grid grid-cols-2"
                    >
                        <TabsTrigger
                            value="allFriends"
                            onClick={() => toggleShowBlockedUsers()}
                        >
                            All
                        </TabsTrigger>
                        <TabsTrigger
                            value="blockedFriends"
                            onClick={() => toggleShowBlockedUsers()}
                        >
                            Blocked Friends
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
                <SearchBar type="message" />
            </div>
            <div className="w-full flex-1 overflow-hidden px-2">
                <ScrollArea className="w-full h-full rounded-md px-3 pr-4">
                    <FriendsList />
                </ScrollArea>
            </div>
        </div>
    );
};

export default FriendsPanel;
