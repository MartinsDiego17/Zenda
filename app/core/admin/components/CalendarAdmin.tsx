"use client";
import { Calendar, dayjsLocalizer, EventProps } from "react-big-calendar";
import type { View } from "react-big-calendar";
import dayjs from "dayjs";
import "react-big-calendar/lib/css/react-big-calendar.css"
import { useEffect, useState } from "react";
import { useReservationsStore } from "@/store/ReservationsStore";
import { useAuthStore } from "@/store/AuthStore";
import { getCalendarEvents, InterfaceEventProps } from "../utils/getCalendarEvents";
import { getCalendarSchedule, PropsCalendarSchedule } from "../utils/getCalendarSchedule";
import "dayjs/locale/es";
import "./rbc.css"
dayjs.locale("es");

export const CalendarAdmin = () => {

    const currentGetAllReservations = useReservationsStore(state => state.getAllReservations);
    const currentSession = useAuthStore(state => state.setSessionFromSupabase);
    const [date, setDate] = useState<Date>(new Date());
    const [view, setView] = useState<View>("day");
    const [events, setEvents] = useState<InterfaceEventProps[]>();
    const localizer = dayjsLocalizer(dayjs);
    const [calendarSchedule, setCalendarSchedule] = useState<PropsCalendarSchedule>();

    useEffect(() => {
        const fetchData = async () => {
            const session = await currentSession();
            const data = await currentGetAllReservations({ professionalId: session?.user.id || "" });
            const eventsCreated = getCalendarEvents({ reservations: data });
            const localCalendarSchedule = await getCalendarSchedule();
            setCalendarSchedule(localCalendarSchedule);
            setEvents(eventsCreated);
        }
        fetchData();
    }, []);

    const components = {
        event: (props: EventProps) => {
            return (
                <h3 className="text-(--color-primary-hover) font-bold">
                    {props.title}
                </h3>
            )
        }
    }

    return (
        <div className="w-[70vw] h-[70vh]">
            <div className="max-w-[70%] h-full">
                <Calendar
                    view={view}
                    date={date}
                    onView={setView}
                    localizer={localizer}
                    onNavigate={setDate}
                    events={events}
                    defaultView="day"
                    min={calendarSchedule?.min || undefined}
                    max={calendarSchedule?.max || undefined}
                    views={["day", "week", "month"]}
                    components={components}
                    messages={{
                        next: "Siguiente",
                        previous: "Anterior",
                        today: "Hoy",
                        month: "Mes",
                        week: "Semana",
                        day: "Día",
                    }}
                />
            </div>
        </div>
    );
}; 
