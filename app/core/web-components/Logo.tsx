import Link from "next/link";
export const Logo = () => {
    return (
        <Link href={"/"}>
            <div className="flex place-items-center gap-x-2 w-fit cursor-pointer">
                <span className="letter-logo text-2xl font-extrabold bg-(--color-primary) py-1 px-3 rounded-[10px] text-white">Z</span>
                <span className="logo-text text-xl text-black font-extrabold">Zenda</span>
            </div>
        </Link>
    );
};
