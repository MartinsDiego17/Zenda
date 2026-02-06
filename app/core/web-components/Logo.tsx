import Link from "next/link";
import { LogoIcon } from "./icons/LogoIcon";

export const Logo = () => {
    return (
        <Link href={"/"}>
            <div className="flex place-items-center gap-x-2 w-fit cursor-pointer">
                <span><LogoIcon /></span>
                <span className="logo-text text-(--color-primary-hover) italic font-bold text-xl">ZENDA</span>
            </div>
        </Link>
    );
};
