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
    time,
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

                <div className="flex justify-between items-center w-full">
                    {subtitle && (
                        <span className="truncate text-xs text-muted-foreground">
                            {subtitle}
                        </span>
                    )}
                    {time && (
                        <span className="text-[10px] text-muted-foreground ml-2 shrink-0">
                            {time}
                        </span>
                    )}
                </div>
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
