import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface props {
    text: string
    route: string
}

export const ButtonViewMore = ({ text, route }: props) => {
    return (
        <Link href={route} className="text-[.8rem] hover:text-(--color-primary-hover) text-(--color-primary) gap-x-1 flex place-items-center justify-between w-fit">
            <span>{text}</span>
            <span><ArrowRight size={12} /></span>
        </Link>
    );
};
