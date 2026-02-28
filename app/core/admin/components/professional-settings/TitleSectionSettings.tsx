import { Icon, LucideIcon } from "lucide-react";

interface TitleSectionProps {
    LucideIcon: LucideIcon
    title: string
}

export const TitleSectionSettings = ({ LucideIcon, title }: TitleSectionProps) => {
    return (
        <div>
            <h2 className="text-[.9rem] flex place-items-center gap-x-2">
                <span><LucideIcon size={15} className="opacity-60"/></span>
                <span className="font-bold opacity-90">{title}</span>
            </h2>
        </div>
    );
};
