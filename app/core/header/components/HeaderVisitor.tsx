"use client";
import Link from "next/link";
import { ButtonPrimary } from "../../web-components/ButtonPrimary";
import { Logo } from "../../web-components/Logo";
import "./headers.css"
import { User2Icon } from "lucide-react";
import { useAuthStore } from "@/store/AuthStore";
import { ModalLogout } from "./ModalLogout";

export const HeaderVisitor = () => {

    const currentSession = useAuthStore(state => state.session);
    const currentLogout = useAuthStore(state => state.logout);

    return (
        <header id="header-visitor" className="header-visitor-container w-screen flex justify-center place-items-center py-5">
            <div className="w-[70vw] flex place-items-center justify-between">
                <Logo />

                {
                    !currentSession
                        ? (

                            <Link href={"/login"}>
                                <ButtonPrimary>
                                    <span><User2Icon /></span>
                                    <span>Iniciar sesión</span>
                                </ButtonPrimary>
                            </Link>
                        )
                        : (
                            <span className="log-out">
                                <ModalLogout handler={currentLogout} />
                            </span>
                        )
                }

            </div>
        </header>
    );
};
