import { useTheme } from "@/components/theme-provider";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import ThemeToggleIcon from "@/assets/theme-toggle-icon";

const ThemeTrigger = () => {
    const { theme, setTheme } = useTheme();

    const handleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";

        if (!document.startViewTransition) {
            setTheme(newTheme);
            return;
        }

        document.startViewTransition(() => {
            setTheme(newTheme);
        });
    };

    return (
        <Tooltip>
            <TooltipTrigger render={<span />}>
                <Button variant="ghost" size="icon-lg" onClick={handleTheme}>
                    <ThemeToggleIcon className="size-5" />
                </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Toggle Theme</TooltipContent>
        </Tooltip>
    );
};

export default ThemeTrigger;
