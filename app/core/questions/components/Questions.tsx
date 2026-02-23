"use client"

import { useEffect, useRef, useState } from "react"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from "@/lib/utils"
import { Chip } from "../../web-components/Chip"

const faqs = [
  {
    question: "¿Qué es Zenda?",
    answer:
      "Zenda es una plataforma que permite a profesionales de la salud mental gestionar su agenda y a los pacientes reservar sesiones de forma simple y ordenada.",
  },
  {
    question: "¿Para quién está pensada la aplicación?",
    answer:
      "Zenda está diseñada para profesionales de la salud mental y pacientes que buscan una forma clara y eficiente de gestionar y reservar sesiones.",
  },
  {
    question: "¿Cómo puedo reservar un sesión?",
    answer:
      "Solo necesitás crear una cuenta, elegir una modalidad de sesión, seleccionar un horario disponible y confirmar la reserva desde la plataforma.",
  },
  {
    question: "¿Es obligatorio abonar una seña?",
    answer:
      "La seña puede ser obligatoria o no, dependiendo de la configuración definida por el profesional que administra la agenda.",
  },
  {
    question: "¿Mis datos personales están seguros en Zenda?",
    answer:
      "Tu privacidad y seguridad son nuestras principales prioridades. Todos los datos personales están cifrados mediante protocolos estándar de la industria y nunca compartimos su información con terceros sin su consentimiento explícito.",
  },
];

export const Questions = () => {
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
        <section id="faq" className="h-screen bg-white border-y py-24 px-6" ref={ref}>
            <div className="mx-auto max-w-3xl">
                <div
                    className={cn(
                        "flex flex-col place-items-center mb-14 text-center transition-all duration-700",
                        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                    )}
                >
                    <Chip text="FAQ" />
                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground text-balance md:text-4xl">
                        Preguntas frecuentes
                    </h2>
                    <p className="mx-auto mt-4 max-w-lg text-muted-foreground leading-relaxed">
                        Todo lo que necesitás saber sobre el uso de Zenda para tus sesiones de práctica o terapia.
                    </p>
                </div>

                <div
                    className={cn(
                        "transition-all duration-700 delay-200",
                        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                    )}
                >
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, index) => (
                            <AccordionItem
                                key={faq.question}
                                value={`item-${index}`}
                                className="border-border/50 transition-colors duration-200 data-[state=open]:bg-muted/30 rounded-lg px-4 -mx-4"
                            >
                                <AccordionTrigger className="text-left text-base font-medium text-foreground hover:text-(--color-primary) hover:no-underline py-5">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </section>
    )
}
