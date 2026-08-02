import Navbar from "@/components/navbar";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
    return (
        <>
            <div className="min-h-screen w-full flex flex-col">
                <div>
                    <Navbar />
                </div>
                <div>
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default AuthLayout;
