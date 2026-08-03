import { Button } from "@/components/ui/button";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/hooks/use-auth";
import { RefreshCwIcon } from "lucide-react";
import { useState } from "react";

const Verify = () => {
    const user = useAuth((state) => state.user);
    const sendEmailLoading = useAuth((state) => state.sendEmailLoading);
    const verifyEmailLoading = useAuth((state) => state.verifyEmailLoading);
    const sendVerifyEmail = useAuth((state) => state.sendVerifyEmail);
    const verifyEmail = useAuth((state) => state.verifyEmail);

    const [otp, setOTP] = useState("");

    const handleSendEmail = () => {
        sendVerifyEmail();
    };

    const handleVerifyEmail = () => {
        if (otp.length !== 6) {
            return;
        }
        verifyEmail(otp);
    };

    return (
        <div className="w-full">
            <Card className="">
                <CardHeader>
                    <CardTitle className="text-center text-xl">
                        Verify your Account
                    </CardTitle>
                    <CardDescription className="text-center">
                        Enter the verification code we sent to your email
                        address:{" "}
                        <span className="font-medium">{user?.email}</span>.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Field>
                        <div className="flex items-center justify-between">
                            <FieldLabel htmlFor="otp-verification">
                                Verification code
                            </FieldLabel>
                            <Button
                                disabled={sendEmailLoading}
                                variant="outline"
                                size="xs"
                                onClick={() => handleSendEmail()}
                            >
                                {sendEmailLoading ? (
                                    <Spinner size="3" />
                                ) : (
                                    <RefreshCwIcon />
                                )}
                                Resend Code
                            </Button>
                        </div>
                        <div className="my-4 flex w-full justify-center">
                            <InputOTP
                                maxLength={6}
                                id="otp-verification"
                                required
                                pattern={REGEXP_ONLY_DIGITS}
                                value={otp}
                                onChange={(prev) => setOTP(prev)}
                            >
                                <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
                                    <InputOTPSlot index={0} />
                                    <InputOTPSlot index={1} />
                                </InputOTPGroup>
                                <InputOTPSeparator className="mx-2" />
                                <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
                                    <InputOTPSlot index={2} />
                                    <InputOTPSlot index={3} />
                                </InputOTPGroup>
                                <InputOTPSeparator className="mx-2" />
                                <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
                                    <InputOTPSlot index={4} />
                                    <InputOTPSlot index={5} />
                                </InputOTPGroup>
                            </InputOTP>
                        </div>
                    </Field>
                </CardContent>
                <Separator />
                <CardFooter>
                    <Field>
                        <Button
                            disabled={verifyEmailLoading}
                            type="submit"
                            className="w-full"
                            onClick={() => handleVerifyEmail()}
                        >
                            Verify
                            {verifyEmailLoading && (
                                <Spinner className="size-4" />
                            )}
                        </Button>
                    </Field>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Verify;
