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
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
    const login = useAuth((state) => state.login);
    const loginLoading = useAuth((state) => state.loginLoading);

    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        login({ identifier, password });
    };

    return (
        <div className="w-full">
            <Card>
                <CardHeader>
                    <CardTitle className="text-center text-xl">Login</CardTitle>
                    <CardDescription className="text-center">
                        Fill the below details to Login
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="identifier">
                                    Username / Email
                                </Label>
                                <Input
                                    id="identifier"
                                    type="text"
                                    value={identifier}
                                    onChange={(e) =>
                                        setIdentifier(e.target.value)
                                    }
                                    placeholder="johndoe / johndoe@gmail.com"
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
                            disabled={loginLoading}
                            type="submit"
                            size="lg"
                            className="w-full"
                            onClick={(e) => handleSubmit(e)}
                        >
                            Login{" "}
                            {loginLoading && <Spinner className="size-4" />}
                        </Button>
                        <div>
                            <span>Don't have an Account ?</span>{" "}
                            <Link to="/auth/verify" className="underline">
                                Sign Up
                            </Link>
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Login;
