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

const MoreOptionsButton = ({ moreOptionsFor, chatId }) => {
    const data = moreOptionsData({ chatId })[moreOptionsFor];

    const archiveChatLoading = useChat((state) => state.archiveChatLoading);
    const unarchiveChatLoading = useChat((state) => state.unarchiveChatLoading);
    const deleteChatLoading = useChat((state) => state.deleteChatLoading);

    return (
        <div>
            <DropdownMenu>
                <Tooltip>
                    <TooltipTrigger
                        render={
                            <DropdownMenuTrigger
                                render={
                                    <Button
                                        variant={data.style ? "ghost" : "link"}
                                        size="icon-lg"
                                    >
                                        {(archiveChatLoading ||
                                            unarchiveChatLoading ||
                                            deleteChatLoading) &&
                                        moreOptionsFor === "chatItem" ? (
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
                        {data.options?.map((item, index) => (
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
                        ))}
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default MoreOptionsButton;
