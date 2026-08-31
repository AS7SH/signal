import { useApp } from "@/hooks/use-app";
import ProfileImage from "./profile-image";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

const UploadImageToBrowser = ({ avatar, name }) => {
    const setSelectedFile = useApp((state) => state.setSelectedFile);
    const setPreviewURL = useApp((state) => state.setPreviewURL);
    const setFileStatus = useApp((state) => state.setFileStatus);
    const previewURL = useApp((state) => state.previewURL);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewURL(URL.createObjectURL(file));
            setFileStatus("idle");
        }
    };

    return (
        <Button className="cursor-pointer p-10" variant="ghost" size="icon-lg">
            <Label htmlFor="file-input" className="cursor-pointer">
                <ProfileImage
                    src={previewURL || avatar}
                    alt={name}
                    size="size-20 text-xl"
                />
            </Label>
            <Input
                id="file-input"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
            />
        </Button>
    );
};

export default UploadImageToBrowser;
