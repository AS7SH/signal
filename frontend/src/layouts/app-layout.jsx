import AppSidebar from "@/components/navigation/app-sidebar";

const AppLayout = () => {
    return (
        <>
            <div className="h-screen w-full flex">
                <AppSidebar />
            </div>
        </>
    );
};

export default AppLayout;
