import UsernameCheckInputTrigger from "@/components/triggers/username-check-input-trigger";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/hooks/use-auth";
import { addToast } from "@/lib/toast";
import { useState } from "react";

import { Link } from "react-router-dom";

const Signup = () => {
    const username = useAuth((state) => state.username);
    const signup = useAuth((state) => state.signup);
    const signupLoading = useAuth((state) => state.signupLoading);
    const isUsernameAvailable = useAuth((state) => state.isUsernameAvailable);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const validInput = () => {
        if (!isUsernameAvailable) {
            addToast({
                description: "This username is not Available",
                type: "error",
            });
            return;
        }

        let n = name.length;
        if (n < 5 || n > 30) {
            addToast({
                description: "Name must contain 5 to 30 characters",
                type: "error",
            });
            return;
        }

        n = password.length;
        if (n < 6 || n > 50) {
            addToast({
                description: "Password must contain 6 to 50 characters",
                type: "error",
            });
            return;
        }

        return true;
    };

    const handleSubmit = (e) => {
        console.log({ username, name, email, password, isUsernameAvailable });
        e.preventDefault();

        if (validInput()) {
            signup({ username, name, email, password });
        }
    };

    return (
        <div className="w-full">
            <Card>
                <CardHeader>
                    <CardTitle className="text-center text-xl">
                        Sign Up
                    </CardTitle>
                    <CardDescription className="text-center">
                        Fill the below details to create an account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
                            <UsernameCheckInputTrigger />
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="John Doe"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="johndoe@gmail.com"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    placeholder="******"
                                />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <Separator />
                <CardFooter>
                    <div className="flex flex-col w-full gap-4 items-center">
                        <Button
                            disabled={signupLoading}
                            type="submit"
                            size="lg"
                            className="w-full"
                            onClick={(e) => handleSubmit(e)}
                        >
                            Submit{" "}
                            {signupLoading && <Spinner className="size-4" />}
                        </Button>
                        <div>
                            <span>Aleary have an Account ?</span>{" "}
                            <Link to="/auth/login" className="underline">
                                Login
                            </Link>
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Signup;
