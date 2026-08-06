import { useAuth } from "@/hooks/use-auth";
import { Navigate, Outlet } from "react-router-dom";

const PublicGuard = () => {
    const user = useAuth((state) => state.user);

    if (user) {
        if (!user.isVerified) {
            return <Navigate to={"/auth/verify"} replace />;
        }

        return <Navigate to={"/"} replace />;
    }

    return <Outlet />;
};

export default PublicGuard;
