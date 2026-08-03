import App from "@/App";
import AuthLayout from "@/layouts/auth-layout";
import Login from "@/pages/login";
import Signup from "@/pages/signup";
import Verify from "@/pages/verify";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route element={<App />} />

            <Route path="auth" element={<AuthLayout />}>
                <Route path="signup" element={<Signup />} />
                <Route path="login" element={<Login />} />
                <Route path="verify" element={<Verify />} />
            </Route>
        </Route>,
    ),
);
