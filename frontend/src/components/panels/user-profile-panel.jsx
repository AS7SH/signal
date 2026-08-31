import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import ProfileImage from "../profile-image";
import UploadImageToBrowser from "../upload-image-to-browser";
import UsernameCheckInputTrigger from "../triggers/username-check-input-trigger";
import PencilIcon from "@/assets/pencil-icon";
import { Separator } from "../ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useApp } from "@/hooks/use-app";
import { Spinner } from "../ui/spinner";
import { useUser } from "@/hooks/use-user";

const UserProfilePanel = () => {
    const user = useAuth((state) => state.user);
    const setFileEmpty = useApp((state) => state.setFileEmpty);
    const uploadImageToCloudinary = useApp(
        (state) => state.uploadImageToCloudinary,
    );
    const username = useAuth((state) => state.username);
    const updateProfile = useUser((state) => state.updateProfile);
    const selectedFile = useApp((state) => state.selectedFile);

    const title = "Profile";

    const [isEditMode, setIsEditMode] = useState(false);
    const [name, setName] = useState(user?.name || "");
    const [about, setAbout] = useState(user?.about || "");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            let finalAvatarUrl = user?.avatar;
            if (selectedFile) {
                finalAvatarUrl = await uploadImageToCloudinary("user_avatar");
            }

            console.log(finalAvatarUrl);

            let payload = {
                name: name || user.name,
                about: about || user.about,
                username: username || user.username,
                avatar: finalAvatarUrl,
            };

            if (password && password.trim() !== "") {
                payload.password = password;
            }

            await updateProfile(payload);
        } catch (error) {
            console.error(error);
        }
        setIsLoading(false);
        setIsEditMode(false);
    };

    return (
        <div className="flex flex-col items-center justify-start w-full h-full gap-4 p-5">
            <div className="flex items-center justify-between w-full">
                <h1 className="text-xl font-semibold">{title}</h1>
            </div>

            <Separator orientation="horizontal" />

            <div className="flex flex-col items-center justify-start w-full gap-6">
                <div className="flex items-end justify-end w-full">
                    <Tooltip>
                        <TooltipTrigger
                            render={
                                <Button
                                    size="icon-lg"
                                    variant={isEditMode ? "secondary" : "ghost"}
                                    onClick={() => {
                                        setIsEditMode((prev) => !prev);
                                        if (isEditMode) {
                                            setName(user?.name || "");
                                            setAbout(user?.about || "");
                                            setPassword("");
                                        } else {
                                            setFileEmpty();
                                        }
                                    }}
                                >
                                    <PencilIcon className="size-5" />
                                </Button>
                            }
                        ></TooltipTrigger>
                        <TooltipContent>
                            {isEditMode ? "Cancel Editing" : "Edit Profile"}
                        </TooltipContent>
                    </Tooltip>
                </div>

                <div className="flex flex-col items-center justify-center w-full gap-4">
                    {isEditMode ? (
                        <UploadImageToBrowser
                            avatar={user?.avatar}
                            name={user?.name}
                        />
                    ) : (
                        <ProfileImage
                            src={user?.avatar}
                            alt={user?.name}
                            size="size-20 text-xl"
                        />
                    )}
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col w-full max-w-md gap-6"
                >
                    <div className="grid gap-2">
                        {isEditMode ? (
                            <UsernameCheckInputTrigger />
                        ) : (
                            <>
                                <Label className="text-muted-foreground">
                                    Username
                                </Label>
                                <p className="text-base font-medium">
                                    {user.username}
                                </p>
                            </>
                        )}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="name" className="text-muted-foreground">
                            Name
                        </Label>
                        {isEditMode ? (
                            <Input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="John Doe"
                            />
                        ) : (
                            <p className="text-base font-medium">
                                {user?.name || "Not provided"}
                            </p>
                        )}
                    </div>

                    <div className="grid gap-2">
                        <Label
                            htmlFor="about"
                            className="text-muted-foreground"
                        >
                            About
                        </Label>
                        {isEditMode ? (
                            <Input
                                id="about"
                                type="text"
                                value={about}
                                onChange={(e) => setAbout(e.target.value)}
                                placeholder="Tell us about yourself"
                            />
                        ) : (
                            <p className="text-base font-medium">
                                {user?.about || "Not provided"}
                            </p>
                        )}
                    </div>

                    {isEditMode && (
                        <div className="grid gap-2">
                            <Label
                                htmlFor="password"
                                className="text-muted-foreground"
                            >
                                New Password (Optional)
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Leave blank to keep current"
                            />
                        </div>
                    )}

                    {isEditMode && (
                        <div className="flex justify-end pt-4">
                            <Button type="submit" disabled={isLoading}>
                                Save Changes {isLoading && <Spinner size={5} />}
                            </Button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default UserProfilePanel;
