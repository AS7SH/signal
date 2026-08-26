import { useAuth } from "@/hooks/use-auth";
import { Button } from "./ui/button";

const LoginButton = () => {
    return (
        <Button
            variant="outline"
            size="xl"
            className="w-full p-2"
            onClick={() =>
                useAuth
                    .getState()
                    .login({ identifier: "asish", password: "Test@1234" })
            }
        >
            Login
        </Button>
    );
};

export default LoginButton;
