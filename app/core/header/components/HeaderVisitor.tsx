import Link from "next/link";
import { ButtonPrimary } from "../../web-components/ButtonPrimary";
import { Logo } from "../../web-components/Logo";
import "./headers.css"
import { User2Icon } from "lucide-react";

export const HeaderVisitor = () => {
    return (
        <header className="header-visitor-container w-screen flex justify-center place-items-center py-5">
            <div className="w-[70vw] flex place-items-center justify-between">
                <Logo />
                <Link href={"/login"}>
                    <ButtonPrimary>
                        <span><User2Icon /></span>
                        <span>Iniciar sesión</span>
                    </ButtonPrimary>
                </Link>
            </div>
        </header>
    );
};
