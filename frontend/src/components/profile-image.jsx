import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const ProfileImage = ({ src, alt }) => {
    return (
        <Avatar>
            <AvatarImage src={src} alt={alt} />
            <AvatarFallback>{alt?.charAt(0)}</AvatarFallback>
        </Avatar>
    );
};

export default ProfileImage;
