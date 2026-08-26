import { Separator } from "../ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Button } from "../ui/button";

import ThemeTrigger from "../triggers/theme-trigger";

import MediaIcon from "@/assets/media-icon";
import { useApp } from "@/hooks/use-app";
import { sidebarData } from "@/data/sidebar-data";

const AppSidebar = () => {
    const setActiveSidePanel = useApp((state) => state.setActiveSidePanel);
    const activeSidePanel = useApp((state) => state.activeSidePanel);

    const data = sidebarData();

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
                                        onClick={() => {
                                            setActiveSidePanel(item?.name);
                                        }}
                                        size="icon-lg"
                                        isActive={
                                            item?.name === activeSidePanel
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
                    <ThemeTrigger orientation="right" />
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
                    {data.navSecondary.map((item, index) => (
                        <div key={index} className="flex flex-col gap-2">
                            <Tooltip>
                                <TooltipTrigger render={<span />}>
                                    <Button
                                        variant="ghost"
                                        onClick={() => {
                                            setActiveSidePanel(item?.name);
                                        }}
                                        size="icon-lg"
                                        isActive={
                                            item?.title === activeSidePanel
                                        }
                                    >
                                        <item.Icon />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent side="right">
                                    <p>{item.title}</p>
                                </TooltipContent>
                            </Tooltip>
                        </div>
                    ))}
                </div>
            </div>
        </aside>
    );
};

export default AppSidebar;
