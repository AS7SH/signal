import signal from "@/assets/signal.png";

import GithubRepoTrigger from "./triggers/github-trigger";
import ThemeTrigger from "./triggers/theme-trigger";

import { Separator } from "./ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { useAuth } from "@/hooks/use-auth";
import LogoutTrigger from "./triggers/logout-trigger";

const Navbar = () => {
    const user = useAuth((state) => state.user);

    return (
        <nav className="sticky top-0 w-full h-14 py-3 px-5 flex justify-between items-center">
            <div>
                <img className="h-7" src={signal} alt="singal logo" />
            </div>
            <div className="flex items-center gap-5">
                <div>
                    <Tooltip>
                        <TooltipTrigger render={<span />}>
                            <GithubRepoTrigger />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>View Github Repo</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
                <Separator orientation="vertical" />
                <div>
                    <Tooltip>
                        <TooltipTrigger render={<span />}>
                            <ThemeTrigger />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Toggle Theme</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
                {user?.isVerified !== false ? (
                    <>
                        <Separator orientation="vertical" />
                        <div>
                            <Tooltip>
                                <TooltipTrigger render={<span />}>
                                    <LogoutTrigger />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Logout</p>
                                </TooltipContent>
                            </Tooltip>
                        </div>
                    </>
                ) : null}
            </div>
        </nav>
    );
};

export default Navbar;
