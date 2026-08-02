import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
import { Toaster } from "./components/ui/toast";
import { TooltipProvider } from "./components/ui/tooltip";

const Root = () => {
    return <RouterProvider router={router} />;
};

createRoot(document.getElementById("root")).render(
    <>
        <TooltipProvider>
            <Root />
        </TooltipProvider>
        <Toaster />
    </>,
);
