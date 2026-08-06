import { useAuth } from "@/hooks/use-auth";
import { Outlet } from "react-router-dom";
import signal from "@/assets/signal.png";

const LoadingLayout = () => {
    const isCheckingAuth = useAuth((state) => state.isCheckingAuth);

    if (isCheckingAuth) {
        return (
            <main className="min-h-screen flex justify-center items-center bg-background">
                <div className="flex items-center gap-5">
                    <p className="text-xs font-medium text-muted-foreground animate-pulse tracking-[0.2em] uppercase">
                        <img className="h-10" src={signal} alt="" />
                    </p>
                    <div className="relative flex items-center justify-center size-10">
                        <div className="absolute inset-0 border-t-2 border-primary rounded-full animate-spin opacity-80"></div>
                        <div className="absolute inset-1.5 border-r-2 border-primary rounded-full animate-spin [animation-duration:1.5s] opacity-50"></div>
                    </div>
                </div>
            </main>
        );
    }

    return <Outlet />;
};

export default LoadingLayout;
