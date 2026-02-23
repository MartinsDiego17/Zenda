"use client";
import { Logo } from "../../web-components/Logo";
import "./headers.css"
import { useAuthStore } from "@/store/AuthStore";
import { ModalLogout } from "./ModalLogout";
import { useRedirectUser } from "@/lib/redirectUser";

export const HeaderDashboardUser = () => {
    
    useRedirectUser();
    const currentLogout = useAuthStore(state => state.logout);


    return (
        <header id="header-visitor" className="border-b header-visitor-container w-screen flex justify-center place-items-center py-5">
            <div className="w-[70vw] flex place-items-center justify-between">
                <Logo />

                <span className="log-out">
                    <ModalLogout handler={currentLogout} />
                </span>

            </div>
        </header>
    );
};
