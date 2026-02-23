"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Video, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Chip } from "../../web-components/Chip"
import "./modalities.css"

function ModalityCard({
    icon: Icon,
    title,
    description,
    features,
    delay,
}: {
    icon: typeof MapPin
    title: string
    description: string
    features: string[]
    delay: number
}) {
    const ref = useRef<HTMLDivElement>(null)
    const [visible, setVisible] = useState(false)
    const [hovered, setHovered] = useState(false)

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
        <div
            ref={ref}
            className={cn(
                "transition-all duration-700",
                visible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            )}
            style={{ transitionDelay: `${delay}ms` }}
        >
            <Card
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className="group relative h-full overflow-hidden border border-border/100 bg-card transition-all duration-500 hover:shadow-[0_20px_40px_var(--color-terciary-transparent)] hover:-translate-y-2 hover:border-(--color-primary-transparent)"
            >
                <div
                    className={cn(
                        "absolute inset-0 transition-opacity duration-500",
                        hovered ? "opacity-100" : "opacity-0"
                    )}
                />

                <CardContent className="relative flex flex-col gap-6 p-8">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-(--color-terciary-transparent) text-(--color-primary) transition-all duration-500 group-hover:bg-(--color-primary) group-hover:text-primary-foreground group-hover:rounded-xl group-hover:scale-110">
                        <Icon className="size-7" />
                    </div>

                    <div className="flex flex-col gap-3">
                        <h3 className="text-xl font-bold text-foreground">
                            {title}
                        </h3>
                        <p className="leading-relaxed text-muted-foreground">
                            {description}
                        </p>
                    </div>

                    <ul className="flex flex-col gap-2.5">
                        {features.map((feature) => (
                            <li
                                key={feature}
                                className="flex items-center gap-2 text-sm text-muted-foreground"
                            >
                                <ArrowRight className="size-3.5 text-(--color-primary) transition-transform duration-300 group-hover:translate-x-0.5" />
                                {feature}
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
    )
}

export const Modalities = () => {
    const ref = useRef<HTMLDivElement>(null)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setVisible(true)
            },
            { threshold: 0.1 }
        )
        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [])

    return (
        <section id="modalities" className="blur-section h-screen border-y py-24 px-6 bg-(--color-secondary-transparent)" ref={ref}>
            <div className="mx-auto max-w-6xl">
                <div
                    className={cn(
                        "mb-16 flex flex-col place-items-center text-center transition-all duration-700",
                        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                    )}
                >
                    <Chip text="Modalidades de sesión" />
                    <h2 className="text-3xl mt-2 font-bold tracking-tight text-foreground text-balance md:text-4xl">
                        Elegí tu modalidad de sesión
                    </h2>
                    <p className="mx-auto mt-4 max-w-lg text-muted-foreground leading-relaxed">
                        La flexibilidad está en el corazón de Zenda. Sin embargo, recomendamos las sesiones presenciales.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                    <ModalityCard
                        icon={MapPin}
                        title="Presenciales"
                        description="Reunite cara a cara en un entorno cómodo y privado diseñado para ayudarte a sentirse a gusto. Perfecto para quienes prefieren una conexión directa y personal."
                        features={[
                            "Oficina privada dedicada",
                            "Programación flexible",
                            "Disponibilidad el mismo día",
                        ]}
                        delay={0}
                    />
                    <ModalityCard
                        icon={Video}
                        title="Virtuales"
                        description="Conectate desde cualquier lugar con sesiones de video seguras y de alta calidad. Ideal para agendas ocupadas o cuando preferís la comodidad del hogar."
                        features={[
                            "Videollamadas encriptadas",
                            "Sin aplicación externa",
                            "Funciona en cualquier dispositivo",
                        ]}
                        delay={150}
                    />
                </div>
            </div>
        </section>
    )
}
