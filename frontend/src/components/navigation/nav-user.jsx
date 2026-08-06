import LogoutIcon from "@/assets/logout-icon";
import { Avatar, AvatarImage } from "../ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { BellRing, KeyboardIcon, Settings } from "lucide-react";

const NavUser = ({ user }) => {
    return (
        <div className="flex justify-center items-center">
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Avatar>
                        <AvatarImage src={user?.avatar} alt={user?.name} />
                    </Avatar>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-full max-w-xs" side="left">
                    <DropdownMenuGroup>
                        <DropdownMenuLabel>Profile</DropdownMenuLabel>
                        <DropdownMenuItem>
                            <Settings /> Settings
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <BellRing /> Notifications
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <KeyboardIcon /> Keyboard Shortcuts
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem variant="destructive">
                            <LogoutIcon className="size-5" />
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default NavUser;
