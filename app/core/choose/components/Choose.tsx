"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ShieldCheck, Clock } from "lucide-react"
import Image from "next/image"
import { useRef, useState, useEffect } from "react"
import chooseImage from "../../../../public/choose/choose.png";
import { Chip } from "../../web-components/Chip"

const benefits = [
    {
        icon: Clock,
        title: "Programación sin esfuerzo",
        description:
            "Decile adiós a las llamadas telefónicas y a las largas esperas. Reservá, reprogramá o cancelá sus sesiones de terapia con solo unos pocos toques, en cualquier momento y desde cualquier dispositivo.",
    },
    {
        icon: ShieldCheck,
        title: "Seguridad y confidencialidad",
        description:
            "Tu privacidad es nuestra principal prioridad. Todos tus datos están encriptados y protegidos, garantizando una experiencia segura y confidencial para cada paciente.",
    },
]

export const Choose = () => {
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
        <section
            id="why-zenda"
            ref={ref}
            className="h-screen border-y bg-white relative overflow-hidden py-24 lg:py-32"
        >
            <div className="mx-auto max-w-7xl px-6">
                <div className="grid items-center gap-16 lg:grid-cols-2">
                    <div
                        className={`relative transition-all duration-700 ${visible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
                            }`}
                    >
                        <div className="relative overflow-hidden rounded-3xl">
                            <Image
                                src={chooseImage.src}
                                alt="Organized therapy workspace with calendar and tools on a clean desk"
                                width={600}
                                height={450}
                                className="aspect-4/3 w-full object-cover"
                            />
                        </div>
                        <div className="absolute -top-6 -right-6 -z-10 size-48 rounded-full border-2 border-dashed border-(--color-terciary-transparent)" />
                    </div>

                    {/* Content side */}
                    <div
                        className={`flex flex-col gap-8 transition-all delay-200 duration-700 ${visible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
                            }`}
                    >
                        <div>
                            <Chip text="La ventaja de Zenda" />
                            <h2
                                className="text-balance text-3xl mt-2 font-bold tracking-tight text-foreground md:text-4xl"
                                style={{ fontFamily: "var(--font-heading)" }}
                            >
                                Por qué elegir Zenda
                            </h2>
                        </div>

                        <div className="flex flex-col gap-6">
                            {benefits.map((benefit, index) => (
                                <Card
                                    key={index}
                                    className="group border-[#eee] bg-card transition-all duration-300 hover:-translate-y-1 hover:border-(--color-primary-transparent) hover:shadow-lg hover:shadow-primary/5"
                                >
                                    <CardContent className="flex gap-5 p-6">
                                        <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-(--color-secondary-transparent) transition-colors group-hover:bg-(--color-terciary-transparent)">
                                            <benefit.icon className="size-6 text-(--color-primary)" />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <h3
                                                className="text-lg font-bold text-card-foreground"
                                                style={{ fontFamily: "var(--font-heading)" }}
                                            >
                                                {benefit.title}
                                            </h3>
                                            <p className="text-sm leading-relaxed text-muted-foreground">
                                                {benefit.description}
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
