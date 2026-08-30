import { Empty, EmptyContent, EmptyHeader } from "@/components/ui/empty";
import { ItemGroup } from "@/components/ui/item";
import { useApp } from "@/hooks/use-app";
import { useEffect } from "react";
import MoreOptionsButton from "./more-options-button";
import ListItem from "./list-item";
import { useFriend } from "@/hooks/use-friend";

const AddFriendList = () => {
    const searchQuery = useApp((state) => state.searchQuery);
    const searchResultedUsersLoading = useFriend(
        (state) => state.searchResultedUsersLoading,
    );
    const searchResultedUsers = useFriend((state) => state.searchResultedUsers);
    const searchUsersWithQuery = useFriend(
        (state) => state.searchUsersWithQuery,
    );
    const tabForAddFriend = useFriend((state) => state.tabForAddFriend);
    const clearSearchUsers = useFriend((state) => state.clearSearchUsers);

    const incomingFriendRequests = useFriend(
        (state) => state.incomingFriendRequests,
    );
    const outgoingFriendRequests = useFriend(
        (state) => state.outgoingFriendRequests,
    );

    useEffect(() => {
        if (tabForAddFriend === "addFriend" && searchQuery.trim() !== "") {
            searchUsersWithQuery(searchQuery);
        } else {
            clearSearchUsers();
        }
    }, [searchQuery, searchUsersWithQuery, clearSearchUsers, tabForAddFriend]);

    const listData = {
        addFriend: {
            list: searchResultedUsers,
            optionType: "addFriendItem",
        },
        incomingRequests: {
            list: incomingFriendRequests,
            optionType: "incomingRequestItem",
        },
        outgoingRequests: {
            list: outgoingFriendRequests,
            optionType: "outgoingRequestItem",
        },
    };

    return (
        <div>
            {searchResultedUsersLoading ? null : listData[tabForAddFriend].list
                  .length <= 0 ? (
                <Empty>
                    <EmptyHeader>Nothing's here</EmptyHeader>
                    <EmptyContent>
                        Add friends and connect with them
                    </EmptyContent>
                </Empty>
            ) : (
                <ItemGroup className="gap-1">
                    {listData[tabForAddFriend].list?.map((item, index) => {
                        console.log("addfriendlist");
                        console.log(item);
                        const user =
                            tabForAddFriend === "addFriend"
                                ? item
                                : tabForAddFriend === "incomingRequests"
                                  ? item.sender
                                  : item.receiver;
                        return (
                            <ListItem
                                key={index}
                                id={`to-be-friend-${user._id}`}
                                avatar={user.avatar}
                                title={user.name}
                                subtitle={user.username}
                                trailingWidget={
                                    <div
                                        onClick={(e) => {
                                            e.stopPropagation();
                                        }}
                                        className="absolute right-0 top-0 opacity-0 z-10 group-hover:opacity-100 transition-opacity duration-150"
                                    >
                                        <MoreOptionsButton
                                            moreOptionsFor={
                                                listData[tabForAddFriend]
                                                    .optionType
                                            }
                                            id={item._id}
                                        />
                                    </div>
                                }
                            />
                        );
                    })}
                </ItemGroup>
            )}
        </div>
    );
};

export default AddFriendList;
