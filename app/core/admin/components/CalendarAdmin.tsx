"use client";
import { Calendar, dayjsLocalizer, EventProps } from "react-big-calendar";
import type { View } from "react-big-calendar";
import dayjs from "dayjs";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEffect, useState, useMemo } from "react";
import { useReservationsStore } from "@/store/ReservationsStore";
import { useAuthStore } from "@/store/AuthStore";
import { getCalendarEvents, InterfaceEventProps } from "../utils/getCalendarEvents";
import { getCalendarSchedule, PropsCalendarSchedule } from "../utils/getCalendarSchedule";
import "dayjs/locale/es";
import "./rbc.css";
import { CalendarShad } from "./CalendarShad";
import { ButtonManualBlock } from "./ButtonManualBlock";
import { Legend } from "./Legend";
import { createNewBlock } from "../utils/createNewBlock";

dayjs.locale("es");

export const CalendarAdmin = () => {

    const currentGetAllReservations = useReservationsStore(state => state.getAllReservations);
    const currentSession = useAuthStore(state => state.setSessionFromSupabase);
    const localSession = useAuthStore(state => state.session);


    const [date, setDate] = useState<Date>(new Date());
    const [view, setView] = useState<View>("day");
    const [events, setEvents] = useState<InterfaceEventProps[]>();
    const [calendarSchedule, setCalendarSchedule] = useState<PropsCalendarSchedule>();

    const [blockDialogOpen, setBlockDialogOpen] = useState(false);
    const [blockDate, setBlockDate] = useState("");
    const [blockStartTime, setBlockStartTime] = useState("");
    const [blockEndTime, setBlockEndTime] = useState("");

    const localizer = dayjsLocalizer(dayjs);

    useEffect(() => {
        const fetchData = async () => {
            const session = await currentSession();
            const data = await currentGetAllReservations({ professionalId: session?.user.id || "" });
            const eventsCreated = getCalendarEvents({
                reservations: data,
                professionalId: session?.user.id || ""
            });


            const localCalendarSchedule = await getCalendarSchedule();
            setCalendarSchedule(localCalendarSchedule);
            setEvents(eventsCreated);
        };

        fetchData();
    }, []);

    const timeSlots = useMemo(() => {
        if (!calendarSchedule?.min || !calendarSchedule?.max) return [];

        const start = dayjs(calendarSchedule.min);
        const end = dayjs(calendarSchedule.max);

        const slots: string[] = [];
        let current = start;

        while (current.isBefore(end)) {
            slots.push(current.format("HH:mm"));
            current = current.add(15, "minute");
        }

        return slots;
    }, [calendarSchedule]);
    const filteredEndTimes = useMemo(() => {
        if (!blockStartTime) return timeSlots;
        return timeSlots.filter(t => t > blockStartTime);
    }, [blockStartTime, timeSlots]);
    const openBlockDialog = () => {
        const formattedDate = dayjs(date).format("YYYY-MM-DD");
        setBlockDate(formattedDate);
        setBlockStartTime("");
        setBlockEndTime("");
        setBlockDialogOpen(true);
    };
    const handleBlockSubmit = async () => {
        const newBlock = {
            date: blockDate,
            start: blockStartTime,
            end: blockEndTime
        }
        const blockCreated = await createNewBlock({ block: newBlock, professionalId: localSession?.user.id || ""});
        setBlockDialogOpen(false);
    };
    const isBlockFormValid =
        blockDate && blockStartTime && blockEndTime;

    const components = {
        event: (props: EventProps) => (
            <h3 className={`text-(--color-primary-hover) font-bold ${props.title !== "Sesión" && "manual-block"}`}>
                {props.title}
            </h3>
        )
    };

    return (
        <div className="w-[70vw] h-[70vh]">
            <section className="w-full h-full flex gap-x-6">
                <article className="w-[70%] h-full">
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
                        eventPropGetter={(event) => {
                            const className = event.title === "Sesión"
                                ? event.title
                                : "bloqueo-manual";
                            return { className: `event-type-${className}` };
                        }}
                    />
                </article>

                <article id="calendar-and-manual-block" className="w-[30%]">
                    <CalendarShad
                        date={date}
                        onSelectDate={(newDate) => {
                            setDate(newDate);
                            setView("day");
                        }}
                    />

                    <ButtonManualBlock
                        open={blockDialogOpen}
                        setOpen={setBlockDialogOpen}
                        openBlockDialog={openBlockDialog}
                        blockDate={blockDate}
                        setBlockDate={setBlockDate}
                        blockStartTime={blockStartTime}
                        setBlockStartTime={setBlockStartTime}
                        blockEndTime={blockEndTime}
                        setBlockEndTime={setBlockEndTime}
                        timeSlots={timeSlots}
                        filteredEndTimes={filteredEndTimes}
                        isValid={!!isBlockFormValid}
                        onSubmit={handleBlockSubmit}
                    />

                    <Legend />
                </article>
            </section>
        </div>
    );
};