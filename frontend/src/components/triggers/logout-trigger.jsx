import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useAuth } from "@/hooks/use-auth";
import { Spinner } from "../ui/spinner";

const LogoutTrigger = () => {
    const logoutLoading = useAuth((state) => state.logoutLoading);
    const logout = useAuth((state) => state.logout);

    const handleLogout = () => {
        logout();
    };

    return (
        <Button
            onClick={() => handleLogout()}
            variant="destructive"
            size="icon-lg"
            disabled={logoutLoading}
        >
            {logoutLoading ? <Spinner className="size-5" /> : <LogOut />}
        </Button>
    );
};

export default LogoutTrigger;
