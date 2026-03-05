"use client"

import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetTrigger,
} from "@/components/ui/sheet"
import { LogIn, Menu } from "lucide-react"
import Link from "next/link"
import { ButtonPrimary } from "../../web-components/ButtonPrimary"
import { ModalLogout } from "./ModalLogout"
import { DialogTitle } from "@/components/ui/dialog"
import { useState } from "react"

interface SheetVisitorProps {
    session: unknown
    logout: () => void
    isHome: boolean
}

export const SheetVisitor = ({ session, logout, isHome }: SheetVisitorProps) => {
    const [open, setOpen] = useState(false)

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button className="bg-transparent">
                    <Menu className="text-black" />
                </Button>
            </SheetTrigger>
            <DialogTitle></DialogTitle>

            <SheetContent>
                <div className="grid flex-1 pt-20 auto-rows-min gap-6 px-4">

                    <ul className="flex flex-col gap-y-5 place-items-center justify-between gap-x-10">

                        {
                            isHome
                                ? (
                                    <>

                                        <li className="text-[.85rem] border-b opacity-50 font-bold">
                                            <Link href="#why-zenda" onClick={() => setOpen(false)}>Beneficios</Link>
                                        </li>
                                        <li className="text-[.85rem] opacity-50 font-bold">
                                            <Link href="#modalities" onClick={() => setOpen(false)}>Modalidades</Link>
                                        </li>
                                        <li className="text-[.85rem] opacity-50 font-bold">
                                            <Link href="#faq" onClick={() => setOpen(false)}>Preguntas frecuentes</Link>
                                        </li>
                                    </>
                                )
                                : <li className="text-[.85rem] opacity-50 font-bold">
                                    <Link href="/" onClick={() => setOpen(false)}>Inicio</Link>
                                </li>
                        }

                    </ul>
                </div>

                <SheetFooter className="pb-10">
                    {!session ? (
                        <Link href="/login" onClick={() => setOpen(false)}>
                            <Button className="w-full bg-transparent text-black">
                                <span><LogIn /></span>
                                <span>Iniciar sesión</span>
                            </Button>
                        </Link>
                    ) : (
                        <span className="log-out">
                            <ModalLogout handler={logout} />
                        </span>
                    )}
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}