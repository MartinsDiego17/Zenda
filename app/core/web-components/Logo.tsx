import Link from "next/link";
import { LogoIcon } from "./icons/LogoIcon";

export const Logo = () => {
    return (
        <Link href={"/"}>
            <div className="flex place-items-center gap-x-1.5 w-fit cursor-pointer">
                <span><LogoIcon /></span>
                <span className="logo-text text-[1rem] text-(--color-primary-hover) italic font-extrabold text-xl">ZENDA</span>
            </div>
        </Link>
    );
};
