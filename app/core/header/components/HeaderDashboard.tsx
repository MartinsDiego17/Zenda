"use client";
import { Logo } from "../../web-components/Logo";
import "./headers.css"
import { useAuthStore } from "@/store/AuthStore";
import { ModalLogout } from "./ModalLogout";
import { useRedirectUser } from "@/lib/redirectUser";
import { User } from "lucide-react";

interface props {
    isUserAdmin?: boolean
}

export const HeaderDashboard = ({ isUserAdmin = false }: props) => {

    useRedirectUser();
    const currentLogout = useAuthStore(state => state.logout);


    return (
        <header id="header-visitor" className="border-b header-visitor-container w-screen flex justify-center place-items-center py-5">
            <div className="w-[70vw] flex place-items-center justify-between">
                <Logo />

                <span className="log-out flex place-items-center gap-x-4">
                {
                    isUserAdmin && (
                        <div className="admin-chip rounded-full gap-x-2 flex place-items-center">
                            <span className="text-(--color-primary)"><User size={15} strokeWidth={2}/></span>
                            <span className="font-light text-[.85rem]">Administrador</span>
                        </div>
                    )
                }

                    <ModalLogout handler={currentLogout} />
                </span>

            </div>
        </header>
    );
};
