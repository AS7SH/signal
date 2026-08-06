import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";
import AddChatIcon from "@/assets/add-chat-icon";
import AddGroupChatIcon from "@/assets/add-group-chat-icon";
import NavUser from "./nav-user";
import { Separator } from "../ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Button } from "../ui/button";
import ThemeTrigger from "../triggers/theme-trigger";
import MessageIcon from "@/assets/message-icon";
import MediaIcon from "@/assets/media-icon";
import CreateChatIcon from "@/assets/create-chat-icon";
import FriendsIcon from "@/assets/friends-icon";
import ArchivedIcon from "@/assets/archived-icon";

const data = {
    user: useAuth.getState().user,
    navMain: [
        {
            title: "Message",
            icon: MessageIcon,
            isActive: true,
        },
        {
            title: "Create Chat",
            icon: CreateChatIcon,
            isActive: false,
            hasSeparator: true,
        },
        {
            title: "Archived Chats",
            icon: ArchivedIcon,
            isActive: false,
        },
        {
            title: "Friends",
            icon: FriendsIcon,
            isActive: false,
        },
    ],
};

const AppSidebar = () => {
    const [activeItem, setActiveItem] = useState(data.navMain[0]);

    return (
        <aside className="overflow-hidden w-16 border-r h-full px-2 py-4">
            <div className="flex flex-col justify-between items-center h-full">
                <div className="flex flex-col gap-2">
                    {data.navMain.map((item, index) => (
                        <div key={index} className="flex flex-col gap-2">
                            <Tooltip>
                                <TooltipTrigger render={<span />}>
                                    <Button
                                        variant="ghost"
                                        onClick={() => setActiveItem(item)}
                                        size="icon-lg"
                                        isActive={
                                            item?.title === activeItem?.title
                                        }
                                    >
                                        <item.icon className="size-5" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent side="right">
                                    <p>{item.title}</p>
                                </TooltipContent>
                            </Tooltip>
                            {item?.hasSeparator && <Separator />}
                        </div>
                    ))}
                </div>
                <div className="flex flex-col gap-2">
                    <ThemeTrigger />
                    <Tooltip>
                        <TooltipTrigger render={<span />}>
                            <Button variant="ghost" size="icon-lg">
                                <MediaIcon className="size-5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                            <p>Media Library</p>
                        </TooltipContent>
                    </Tooltip>
                    <NavUser user={data.user} />
                </div>
            </div>
        </aside>
    );
};

export default AppSidebar;
