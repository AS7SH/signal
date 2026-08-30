import { useFriend } from "@/hooks/use-friend";
import ListItem from "./list-item";
import { useApp } from "@/hooks/use-app";
import { useAuth } from "@/hooks/use-auth";
import MoreOptionsButton from "./more-options-button";

const FriendsList = () => {
    const searchQuery = useApp((state) => state.searchQuery);
    const user = useAuth((state) => state.user);

    const blockedFriends = useFriend((state) => state.blockedFriends);
    const allFriends = useFriend((state) => state.allFriends);

    const showBlockedUsers = useFriend((state) => state.showBlockedUsers);

    const friendList = showBlockedUsers ? blockedFriends : allFriends;

    const resultedFriends = Array.isArray(friendList)
        ? friendList.filter((friend) => {
              return friend?.name
                  ?.toLowerCase()
                  .includes(searchQuery.toLowerCase());
          })
        : [];

    return resultedFriends.map((friend, idx) => (
        <ListItem
            key={idx}
            id={`friend-${friend._id}`}
            avatar={friend.avatar}
            title={friend.name}
            trailingWidget={
                <div
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                    className="absolute right-0 top-0 opacity-0 z-10 group-hover:opacity-100 transition-opacity duration-150"
                >
                    <MoreOptionsButton
                        moreOptionsFor="friendItem"
                        id={friend._id}
                    />
                </div>
            }
        />
    ));
};

export default FriendsList;
