import { useAuth } from "@/hooks/use-auth";
import { useEffect, useState } from "react";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "../ui/input-group";
import { Spinner } from "../ui/spinner";
import { CircleCheck, CircleX } from "lucide-react";
import { Label } from "../ui/label";

const UsernameCheckInputTrigger = () => {
    const username = useAuth((state) => state.username);
    const setUsername = useAuth((state) => state.setUsername);
    const checkUsernameLoading = useAuth((state) => state.checkUsernameLoading);
    const isUsernameAvailable = useAuth((state) => state.isUsernameAvailable);
    const checkUsername = useAuth((state) => state.checkUsername);

    const [isDebounce, setIsDebounce] = useState(false);

    useEffect(() => {
        if (username.length < 5) {
            setIsDebounce(false);
            return;
        }

        setIsDebounce(true);

        const timer = setTimeout(() => {
            checkUsername(username);
            setIsDebounce(false);
        }, 800);

        return () => clearTimeout(timer);
    }, [username, checkUsername]);

    return (
        <>
            <div className="grid gap-2 w-full">
                <Label htmlFor="username">Username</Label>
                <InputGroup>
                    <InputGroupInput
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="johndoe"
                    />
                    <InputGroupAddon align="inline-end">
                        {username.length > 4 ? (
                            isDebounce || checkUsernameLoading ? (
                                <Spinner className="size-5" />
                            ) : isUsernameAvailable ? (
                                <CircleCheck className="size-5 stroke-green-700" />
                            ) : (
                                <CircleX className="size-5 stroke-red-700" />
                            )
                        ) : null}
                    </InputGroupAddon>
                </InputGroup>
            </div>
        </>
    );
};

export default UsernameCheckInputTrigger;
