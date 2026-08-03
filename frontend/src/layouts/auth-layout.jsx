import Navbar from "@/components/navbar";
import { Separator } from "@/components/ui/separator";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
    return (
        <>
            <div className="min-h-screen w-full flex flex-col">
                <Navbar />
                <Separator />
                <div className="flex justify-center items-center mt-14">
                    <div className="w-full max-w-md">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    );
};

export default AuthLayout;
