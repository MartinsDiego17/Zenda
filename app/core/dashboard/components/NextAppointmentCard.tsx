"use client"

import { CardContent, } from "@/components/ui/card"
import { CalendarCheck, Clock, Video } from "lucide-react"

interface Appointment {
    date: string
    time: string
    modality: string
}

export function NextAppointmentCard({ appointment, }: { appointment: Appointment | null }) {
    return (
        <CardContent className="flex flex-col gap-5 mt-10 w-full p-0">
            <div className="flex flex-col gap-3 rounded-xl bg-(--color-secondary-transparent) p-4">
                <div className="flex items-center gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-(--color-terciary-transparent)">
                        <CalendarCheck className="size-5 text-(--color-primary)" />
                    </div>
                    <div>
                        <p className="text-xs font-medium text-muted-foreground">
                            Fecha
                        </p>
                        <p className="text-sm font-semibold text-foreground">
                            {appointment?.date}
                        </p>
                    </div>
                </div>
                <div className="h-px bg-border/60" />
                <div className="flex items-center gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-(--color-terciary-transparent)">
                        <Clock className="size-5 text-(--color-primary)" />
                    </div>
                    <div>
                        <p className="text-xs font-medium text-muted-foreground">
                            Horario
                        </p>
                        <p className="text-sm font-semibold text-foreground">
                            {appointment?.time}
                        </p>
                    </div>
                </div>
                <div className="h-px bg-border/60" />
                <div className="flex items-center gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-(--color-terciary-transparent)">
                        <Video className="size-5 text-(--color-primary)" />
                    </div>
                    <div>
                        <p className="text-xs font-medium text-muted-foreground">
                            Modalidad
                        </p>
                        <p className="text-sm font-semibold text-foreground">
                            {appointment?.modality}
                        </p>
                    </div>
                </div>
            </div>
        </CardContent>
    )
}
