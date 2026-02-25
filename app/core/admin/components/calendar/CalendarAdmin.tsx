"use client";

import { Calendar, dayjsLocalizer, EventProps } from "react-big-calendar";
import type { View } from "react-big-calendar";
import dayjs from "dayjs";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEffect, useState, useMemo } from "react";
import { useReservationsStore } from "@/store/ReservationsStore";
import { useAuthStore } from "@/store/AuthStore";
import { getCalendarEvents, InterfaceEventProps } from "../../utils/getCalendarEvents";
import { getCalendarSchedule, PropsCalendarSchedule } from "../../utils/getCalendarSchedule";
import "dayjs/locale/es";
import "../rbc.css";
import { CalendarShad } from "./CalendarShad";
import { ButtonManualBlock } from "./ButtonManualBlock";
import { Legend } from "./Legend";
import { createNewBlock } from "../../utils/createNewBlock";
import { formatBlockEventForUI } from "../../utils/formattedDateToModal";
import { ModalDeleteReservation } from "./ModalDeleteManualBlock";
import { useProfessionalSettingsStore } from "@/store/ProfessionalSettingsStore";

dayjs.locale("es");
type BlockToDelete = ReturnType<typeof formatBlockEventForUI>;

export const CalendarAdmin = () => {

    const deleteReservation = useReservationsStore(s => s.deleteReservation);
    const getAllReservations = useReservationsStore(s => s.getAllReservations);
    const setSession = useAuthStore(s => s.setSessionFromSupabase);
    const session = useAuthStore(s => s.session);
    const currentGetProfessionalSettings = useProfessionalSettingsStore(state => state.getProfessionalSettings);
    const [sessionMinutesDuration, setSessionMinutesDuration] = useState(45);

    const [date, setDate] = useState<Date>(new Date());
    const [view, setView] = useState<View>("week");
    const [events, setEvents] = useState<InterfaceEventProps[]>([]);
    const [calendarSchedule, setCalendarSchedule] = useState<PropsCalendarSchedule>();

    const [blockDialogOpen, setBlockDialogOpen] = useState(false);
    const [blockDate, setBlockDate] = useState("");
    const [blockStartTime, setBlockStartTime] = useState("");
    const [blockEndTime, setBlockEndTime] = useState("");

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [blockToDelete, setBlockToDelete] = useState<BlockToDelete | null>(null);
    const [reservationToDelete, setReservationToDelete] = useState<InterfaceEventProps>();

    const localizer = dayjsLocalizer(dayjs);

    const occupiedRanges = useMemo(() => {
        if (!events || !blockDate) return [];

        return events
            .filter(e => dayjs(e.start).format("YYYY-MM-DD") === blockDate)
            .map(e => ({
                start: dayjs(e.start),
                end: dayjs(e.end),
            }));
    }, [events, blockDate]);

    const hasOverlap = (start: string, end: string) => {
        const newStart = dayjs(`${blockDate} ${start}`);
        const newEnd = dayjs(`${blockDate} ${end}`);

        return occupiedRanges.some(r =>
            newStart.isBefore(r.end) && newEnd.isAfter(r.start)
        );
    };

    const canStartAt = (time: string) => {
        const start = dayjs(`${blockDate} ${time}`);
        return !occupiedRanges.some(r =>
            start.isSame(r.start) ||
            (start.isAfter(r.start) && start.isBefore(r.end))
        );
    };

    const timeSlots = useMemo(() => {
        if (!calendarSchedule?.min || !calendarSchedule?.max) return [];

        const start = dayjs(calendarSchedule.min);
        const end = dayjs(calendarSchedule.max);

        const slots: string[] = [];
        let current = start;

        while (current.isBefore(end)) {
            slots.push(current.format("HH:mm"));
            current = current.add(sessionMinutesDuration + 10, "minute");
        }

        return slots;
    }, [calendarSchedule, sessionMinutesDuration]);

    const validEndTimes = useMemo(() => {
        if (!blockStartTime || !blockDate || !calendarSchedule?.max) return [];

        const start = dayjs(`${blockDate} ${blockStartTime}`);

        // We need its HH:mm string as a candidate end time, even though
        // it is not a session-start slot and therefore absent from timeSlots.
        const workdayEndStr = dayjs(calendarSchedule.max).format("HH:mm");
        const candidates = timeSlots.includes(workdayEndStr)
            ? timeSlots
            : [...timeSlots, workdayEndStr];

        return candidates.filter(t => {
            const end = dayjs(`${blockDate} ${t}`);
            if (!end.isAfter(start)) return false;

            return !occupiedRanges.some(r =>
                start.isBefore(r.end) && end.isAfter(r.start)
            );
        });
    }, [blockStartTime, blockDate, timeSlots, occupiedRanges, calendarSchedule]);

    const reloadCalendar = async () => {
        const s = await setSession();
        if (!s?.user?.id) return;

        const data = await getAllReservations({ professionalId: s.user.id });
        setEvents(getCalendarEvents({ reservations: data, professionalId: s.user.id }));
        setCalendarSchedule(await getCalendarSchedule());
    };

    useEffect(() => {
        const init = async () => {
            await reloadCalendar();
        };

        void init();
    }, []);

    useEffect(() => {
        const fetchSettings = async () => {
            const data = await currentGetProfessionalSettings();
            setSessionMinutesDuration(data.session_duration_minutes);
        }
        fetchSettings();
    }, []);

const openBlockDialog = () => {
    const selected = dayjs(date);
    const tomorrow = dayjs().add(1, "day").startOf("day");
    const defaultDate = selected.isBefore(tomorrow) ? tomorrow : selected;
    setBlockDate(defaultDate.format("YYYY-MM-DD"));
    setBlockStartTime("");
    setBlockEndTime("");
    setBlockDialogOpen(true);
};

    const handleBlockSubmit = async () => {
        if (hasOverlap(blockStartTime, blockEndTime)) {
            alert("El bloqueo se solapa con una reserva o bloqueo existente");
            return;
        }

        await createNewBlock({
            block: {
                date: blockDate,
                start: blockStartTime,
                end: blockEndTime,
            },
            professionalId: session?.user.id || "",
        });

        await reloadCalendar();
        setBlockDialogOpen(false);
    };

    const handleOpenModalDelete = (event: InterfaceEventProps) => {
        if (event.title !== "Sesión") {
            setReservationToDelete(event);
            setBlockToDelete(formatBlockEventForUI(event));
            setDeleteModalOpen(true);
        }
    };

    const handleDeleteSubmit = async () => {
        await deleteReservation({ reservationId: reservationToDelete?.id || "" });
        setDeleteModalOpen(false);
        await reloadCalendar();
    };

    return (
        <>
            {blockToDelete && (
                <ModalDeleteReservation
                    open={deleteModalOpen}
                    onOpenChange={setDeleteModalOpen}
                    handleDeleteSubmit={handleDeleteSubmit}
                    reservationId={reservationToDelete?.id || ""}
                    {...blockToDelete}
                />
            )}

            <div className="w-[70vw] h-[70vh]">
                <section className="flex gap-6 h-full">
                    <article className="w-[70%]">
                        <Calendar
                            localizer={localizer}
                            events={events}
                            date={date}
                            view={view}
                            onView={setView}
                            onNavigate={setDate}
                            min={calendarSchedule?.min ?? undefined}
                            max={calendarSchedule?.max ?? undefined}
                            defaultView="day"
                            views={["day", "week", "month"]}
                            onSelectEvent={handleOpenModalDelete}
                            messages={{
                                today: "Hoy",
                                next: "Siguiente",
                                previous: "Anterior",
                                month: "Mes",
                                week: "Semana",
                                day: "Día",
                            }}
                            eventPropGetter={(event) => ({
                                className: `event-type-${event.title === "Sesión" ? "Sesion" : "bloqueo-manual"}`
                            })}
                        />
                    </article>

                    <article id="calendar-and-manual-block" className="w-[30%]">
                        <CalendarShad
                            date={date}
                            onSelectDate={(d) => {
                                setDate(d);
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
                            validEndTimes={validEndTimes}
                            canStartAt={canStartAt}
                            isValid={!!(blockDate && blockStartTime && blockEndTime)}
                            onSubmit={handleBlockSubmit}
                        />

                        <Legend />
                    </article>
                </section>
            </div>
        </>
    );
};