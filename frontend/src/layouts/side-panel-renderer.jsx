import { sidebarData } from "@/data/sidebar-data";
import { useApp } from "@/hooks/use-app";
import { useEffect } from "react";

const SidePanelRender = () => {
    const data = sidebarData();
    const activeSidePanel = useApp((state) => state.activeSidePanel);
    const setSearchQuery = useApp((state) => state.setSearchQuery);

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
    }, [activeItem?.name, setSearchQuery]);

    if (!PanelComponent) return null;

    return <PanelComponent />;
};

export default SidePanelRender;
