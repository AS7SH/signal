import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";

import Login from "@/pages/login";
import Signup from "@/pages/signup";
import Verify from "@/pages/verify";

import ProtectGuard from "./protect-guard";
import PublicGuard from "./public-guard";
import VerifyGuard from "./verify-guard";
import AuthLayout from "@/layouts/auth-layout";
import LoadingLayout from "@/layouts/loading-layout";
import AppLayout from "@/layouts/app-layout";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route element={<LoadingLayout />}>
                <Route element={<ProtectGuard />}>
                    <Route path="/" element={<AppLayout />} />
                </Route>

                <Route path="auth" element={<AuthLayout />}>
                    <Route element={<PublicGuard />}>
                        <Route path="signup" element={<Signup />} />
                        <Route path="login" element={<Login />} />
                    </Route>

                    <Route element={<VerifyGuard />}>
                        <Route path="verify" element={<Verify />} />
                    </Route>
                </Route>
            </Route>
        </Route>,
    ),
);
