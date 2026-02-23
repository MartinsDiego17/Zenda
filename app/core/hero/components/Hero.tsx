"use client"

import { CalendarCheck } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Logo } from "../../web-components/Logo"
import heroImage from "../../../../public/hero/hero.png";
import { ButtonPrimary } from "../../web-components/ButtonPrimary"
import Link from "next/link"
import { ButtonSecondary } from "../../web-components/ButtonSecondary"

export const Hero = () => {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => setVisible(true), 100)
        return () => clearTimeout(timer)
    }, [])

    return (
        <section id="#" className="relative flex min-h-screen items-center overflow-hidden pt-20">


            <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:gap-20">
                <div
                    className={`flex flex-col gap-8 transition-all duration-700 ${visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                        }`}
                >
                    <div className="flex items-center gap-3">
                        <Logo />
                    </div>

                    <h1
                        className="text-balance text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        <span>Tu camino hacia la salud mental, </span>
                        <span className="relative inline-block">
                            <span className="relative z-10 text-(--color-primary)">simplificado</span>
                            <span className="absolute -bottom-1 left-0 h-3 w-full bg-(--color-primary-transparent) rounded-sm" />
                        </span>
                    </h1>

                    <p className="max-w-lg text-pretty text-lg leading-relaxed text-muted-foreground">
                        Zenda agiliza la reserva de sesiones para profesionales de la salud mental y sus clientes. Gestiona citas presenciales y virtuales en una plataforma tranquila e intuitiva.
                    </p>

                    <div className="flex flex-wrap items-center gap-4">
                        <Link href={"/login"}>
                            <ButtonPrimary>
                                <span><CalendarCheck /></span>
                                <span>Reservar sesión</span>
                            </ButtonPrimary>
                        </Link>
                        <Link href={"#why-zenda"}>
                            <ButtonSecondary>
                                Sobre Zenda
                            </ButtonSecondary>
                        </Link>
                    </div>
                </div>

                <div
                    className={`relative transition-all delay-200 duration-700 ${visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                        }`}
                >
                    <div className="relative overflow-hidden rounded-3xl shadow-2xl shadow-primary/10">
                        <Image
                            src={heroImage.src}
                            alt="Calm and welcoming therapy office with natural lighting and modern decor"
                            width={700}
                            height={500}
                            className="aspect-4/3 w-full object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-foreground/10 to-transparent" />
                    </div>

                    <div className="absolute -bottom-6 -left-6 rounded-2xl border border-border bg-card p-4 shadow-lg">
                        <div className="flex items-center gap-3">
                            <div className="flex size-10 items-center justify-center rounded-xl bg-(--color-terciary-transparent)">
                                <CalendarCheck className="size-5 text-(--color-primary)" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-card-foreground">
                                    Próximo disponible
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Hoy a las 3:00 PM
                                </p>
                            </div>
                        </div>
                    </div>



                </div>
            </div>
        </section>
    )
}
