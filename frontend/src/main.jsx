import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
import { Toaster } from "./components/ui/toast";
import { TooltipProvider } from "./components/ui/tooltip";
import { ThemeProvider } from "./components/theme-provider";
import { useEffect } from "react";
import { useAuth } from "./hooks/use-auth";

const Root = () => {
    const refresh = useAuth((state) => state.refresh);

    useEffect(() => {
        refresh();

        const intervalId = setInterval(
            () => {
                refresh();
            },
            14 * 60 * 1000,
        );

        return () => clearInterval(intervalId);
    }, [refresh]);
    return <RouterProvider router={router} />;
};

createRoot(document.getElementById("root")).render(
    <>
        <ThemeProvider>
            <TooltipProvider>
                <Root />
            </TooltipProvider>
        </ThemeProvider>
        <Toaster />
    </>,
);
