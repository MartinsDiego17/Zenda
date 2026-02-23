"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LogIn } from "lucide-react"

import { ButtonPrimary } from "../../web-components/ButtonPrimary"
import { Logo } from "../../web-components/Logo"
import { useAuthStore } from "@/store/AuthStore"
import { ModalLogout } from "./ModalLogout"

import "./headers.css"

export const HeaderVisitor = () => {
    const pathname = usePathname()

    const currentSession = useAuthStore(state => state.session)
    const currentLogout = useAuthStore(state => state.logout)

    const scroll = () => {
        window.scrollTo(0, 0)
    }

    const isHome = pathname === "/"

    return (
        <header
            id="header-visitor"
            className="header-visitor-container w-screen flex justify-center place-items-center py-5"
        >
            <div className="w-[70vw] flex place-items-center justify-between">
                <button onClick={scroll}>
                    <Logo />
                </button>

                <div className="flex place-items-center gap-x-10">
                    {isHome && (
                        <>
                            <ul className="flex place-items-center justify-between gap-x-10">
                                <li className="text-[.85rem] opacity-50 font-bold">
                                    <Link href="#why-zenda">Beneficios</Link>
                                </li>
                                <li className="text-[.85rem] opacity-50 font-bold">
                                    <Link href="#modalities">Modalidades</Link>
                                </li>
                                <li className="text-[.85rem] opacity-50 font-bold">
                                    <Link href="#faq">Preguntas frecuentes</Link>
                                </li>
                            </ul>




                            <>
                                {!currentSession ? (
                                    <Link href="/login">
                                        <ButtonPrimary>
                                            <span>
                                                <LogIn />
                                            </span>
                                            <span>Iniciar sesión</span>
                                        </ButtonPrimary>
                                    </Link>
                                ) : (
                                    <span className="log-out">
                                        <ModalLogout handler={currentLogout} />
                                    </span>
                                )}
                            </>
                        </>
                    )}
                </div>
            </div>
        </header>
    )
}