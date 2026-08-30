import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Spinner } from "@/components/ui/spinner";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { moreOptionsData } from "@/data/more-options-data";
import { useApp } from "@/hooks/use-app";
import { useChat } from "@/hooks/use-chat";
import { useFriend } from "@/hooks/use-friend";
import { useState } from "react";

const MoreOptionsButton = ({ moreOptionsFor, id }) => {
    const data = moreOptionsData()[moreOptionsFor];

    const [isOpen, setIsOpen] = useState(false);

    const archiveChatLoadingId = useChat((state) => state.archiveChatLoadingId);
    const unarchiveChatLoadingId = useChat(
        (state) => state.unarchiveChatLoadingId,
    );
    const deleteChatLoadingId = useChat((state) => state.deleteChatLoadingId);
    const sendFriendRequestLoadingId = useFriend(
        (state) => state.sendFriendRequestLoadingId,
    );
    const acceptFriendRequestLoadingId = useFriend(
        (state) => state.acceptFriendRequestLoadingId,
    );
    const rejectFriendRequestLoadingId = useFriend(
        (state) => state.rejectFriendRequestLoadingId,
    );
    const cancelFriendRequestLoadingId = useFriend(
        (state) => state.cancelFriendRequestLoadingId,
    );
    const unblockUserLoadingId = useFriend(
        (state) => state.unblockUserLoadingId,
    );
    const blockUserLoadingId = useFriend((state) => state.blockUserLoadingId);

    const isLoading = [
        archiveChatLoadingId,
        unarchiveChatLoadingId,
        deleteChatLoadingId,
        sendFriendRequestLoadingId,
        acceptFriendRequestLoadingId,
        rejectFriendRequestLoadingId,
        cancelFriendRequestLoadingId,
        unblockUserLoadingId,
        blockUserLoadingId,
    ].includes(id);

    return (
        <div>
            <DropdownMenu onOpenChange={setIsOpen}>
                <Tooltip>
                    <TooltipTrigger
                        render={
                            <DropdownMenuTrigger
                                render={
                                    <Button
                                        variant={data.style ? "ghost" : "link"}
                                        size="icon-lg"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <Spinner size="3" />
                                        ) : (
                                            <data.icon className="size-5" />
                                        )}
                                    </Button>
                                }
                            />
                        }
                    />
                    {data.tooptip && (
                        <TooltipContent>More Options</TooltipContent>
                    )}
                </Tooltip>
                <DropdownMenuContent className="max-w-xl w-full">
                    <DropdownMenuGroup>
                        {isOpen &&
                            data.getOptions(id)?.map((item, index) =>
                                item.hide ? null : (
                                    <div key={index}>
                                        <DropdownMenuItem
                                            onSelect={(e) => {
                                                e.preventDefault();
                                            }}
                                            variant={item?.type}
                                            onClick={() =>
                                                item.action
                                                    ? item.action()
                                                    : useApp
                                                          .getState()
                                                          .setActiveSidePanel(
                                                              item?.name,
                                                          )
                                            }
                                        >
                                            <item.icon className="size-5" />
                                            {item.title}
                                        </DropdownMenuItem>
                                        {item?.hasSeparater && (
                                            <DropdownMenuSeparator />
                                        )}
                                    </div>
                                ),
                            )}
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default MoreOptionsButton;
