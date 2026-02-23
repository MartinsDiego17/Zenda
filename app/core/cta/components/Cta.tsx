"use client"

import { Button } from "@/components/ui/button"
import { CalendarCheck, ArrowRight } from "lucide-react"
import { useRef, useState, useEffect } from "react"
import { ButtonPrimary } from "../../web-components/ButtonPrimary"
import Link from "next/link"

export const Cta = () => {
    const ref = useRef<HTMLDivElement>(null)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setVisible(true)
            },
            { threshold: 0.2 }
        )
        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [])

    return (
        <section ref={ref} className="bg-(--color-secondary-transparent) blur-section relative overflow-hidden py-24 lg:py-32">


            <div
                className={`relative mx-auto max-w-3xl px-6 text-center transition-all duration-700 ${visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                    }`}
            >
                <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-3xl bg-(--color-secondary-transparent)">
                    <CalendarCheck className="size-8 text-(--color-primary)" />
                </div>

                <h2
                    className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl"
                    style={{ fontFamily: "var(--font-heading)" }}
                >
                    <span>¿Listo para dar </span>
                    <span className="text-(--color-primary)">el primer paso?</span>
                </h2>

                <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
                    Tu salud mental importa. Reserva tu primera sesión hoy y comienza tu viaje hacia una vida más saludable y feliz con Zenda.
                </p>

                <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                    <Link href={"/login"}>
                        <ButtonPrimary>
                            <span>Reservar sesión</span>
                            <span><ArrowRight className="size-5" /></span>
                        </ButtonPrimary>
                    </Link>
                </div>
            </div>
        </section>
    )
}
