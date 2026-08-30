import { sidebarData } from "@/data/sidebar-data";
import { useApp } from "@/hooks/use-app";
import { useChat } from "@/hooks/use-chat";
import { useEffect } from "react";

const SidePanelRender = () => {
    const data = sidebarData();
    const activeSidePanel = useApp((state) => state.activeSidePanel);
    const setSearchQuery = useApp((state) => state.setSearchQuery);
    const setCreateWhich = useChat((state) => state.setCreateWhich);

    const activeItem =
        data.navMain.find((item) => item.name === activeSidePanel) ||
        data.navSecondary.find((item) => item.name === activeSidePanel);

    const PanelComponent = activeItem?.panel;

    useEffect(() => {
        if (
            activeItem?.name !== "chatsPanel" &&
            activeItem?.name !== "archivedChatsPanel"
        ) {
            setSearchQuery("");
        }

        if (activeItem?.name !== "createChatPanel") {
            setCreateWhich("directChat");
        }
    }, [activeItem?.name, setSearchQuery]);

    if (!PanelComponent) return null;

    return <PanelComponent />;
};

export default SidePanelRender;
