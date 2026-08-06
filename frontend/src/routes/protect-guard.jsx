import { useAuth } from "@/hooks/use-auth";
import { Navigate, Outlet } from "react-router-dom";

const ProtectGuard = () => {
    const user = useAuth((state) => state.user);

    if (!user) {
        return <Navigate to={"/auth/login"} replace />;
    }

    if (!user.isVerified) {
        return <Navigate to={"/auth/verify"} replace />;
    }

    return <Outlet />;
};

export default ProtectGuard;
