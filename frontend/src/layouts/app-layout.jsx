import AppSidebar from "@/components/navigation/app-sidebar";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useChat } from "@/hooks/use-chat";
import { useEffect } from "react";
import MainPanelRenderer from "./main-panel-renderer";
import SidePanelRender from "./side-panel-renderer";
import { useFriend } from "../hooks/use-friend";

const AppLayout = () => {
    const getUserChats = useChat((state) => state.getUserChats);
    const getAllFriends = useFriend((state) => state.getAllFriends);
    const getIncomingFrndReq = useFriend((state) => state.getIncomingFrndReq);
    const getOutgoingFrndReq = useFriend((state) => state.getOutgoingFrndReq);
    const getBlockedUsers = useFriend((state) => state.getBlockedUsers);

    useEffect(() => {
        getUserChats();
        getAllFriends();
        getIncomingFrndReq();
        getOutgoingFrndReq();
        getBlockedUsers();
    }, [
        getUserChats,
        getAllFriends,
        getIncomingFrndReq,
        getOutgoingFrndReq,
        getBlockedUsers,
    ]);

    return (
        <>
            <div className="h-screen w-full flex">
                <div>
                    <AppSidebar />
                </div>
                <div className="w-full h-screen">
                    <ResizablePanelGroup
                        orientation="horizontal"
                        className="w-full h-full border"
                    >
                        <ResizablePanel defaultSize="30%" maxSize="50%">
                            <SidePanelRender />
                        </ResizablePanel>
                        <ResizableHandle withHandle />
                        <ResizablePanel>
                            <MainPanelRenderer />
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </div>
            </div>
        </>
    );
};

export default AppLayout;
