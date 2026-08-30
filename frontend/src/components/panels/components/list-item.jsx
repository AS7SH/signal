import ProfileImage from "@/components/profile-image";
import { cn } from "@/lib/utils";

const ListItem = ({
    id,
    avatar,
    title,
    subtitle,
    trailingWidget,
    onClick,
    isActive,
}) => {
    return (
        <div
            id={id}
            role="button"
            tabIndex={0}
            onClick={onClick}
            className={cn(
                isActive && "bg-muted/90 text-foreground",
                "flex group relative w-full cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 transition-colors hover:bg-muted/50 h-16",
            )}
        >
            <div className="flex shrink-0 items-center justify-center">
                <ProfileImage src={avatar} alt={title} />
            </div>

            <div className="flex flex-1 flex-col gap-0.5 overflow-hidden items-start">
                <span className="truncate text-sm font-medium leading-snug">
                    {title}
                </span>

                {subtitle && (
                    <span className="truncate text-xs text-muted-foreground">
                        {subtitle}
                    </span>
                )}
            </div>

            {trailingWidget && (
                <div className="flex justify-center items-center">
                    {trailingWidget}
                </div>
            )}
        </div>
    );
};

export default ListItem;
