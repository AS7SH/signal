import { useAuth } from "@/hooks/use-auth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const ProfileImage = ({ src, alt, size, isUserAvatar }) => {
    const user = useAuth((state) => state.user);

    const imgsrc = isUserAvatar ? user.avatar : src;
    const alttext = isUserAvatar ? user.name : alt;

    return (
        <Avatar className={size}>
            <AvatarImage src={imgsrc} alt={alttext} />
            <AvatarFallback>{alttext?.charAt(0)}</AvatarFallback>
        </Avatar>
    );
};

export default ProfileImage;
