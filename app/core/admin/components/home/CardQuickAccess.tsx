import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface Props {
    label: string;
    href: string;
    Icon: LucideIcon;
}

export const CardQuickAccess = ({ label, href, Icon }: Props) => {
    return (
        <Link
            key={href}
            href={href}
            className="group flex flex-col items-center gap-3 rounded-[15px] border border-border/60 bg-card p-3.75 text-center transition-all hover:border-(--color-primary-transparent) hover:bg-(--color-secondary-transparent) hover:shadow-sm"
        >
            <div className="flex size-12 items-center justify-center rounded-xl bg-(--color-terciary-transparent) transition-colors ">
                <Icon className="size-6 text-muted-foreground transition-colors group-hover:text-(--color-primary)" />
            </div>
            <span className="text-xs font-medium text-foreground">
                {label}
            </span>
        </Link>
    );
};