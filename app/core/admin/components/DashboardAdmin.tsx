"use client";
import { useEffect, useState } from "react";
import { LayoutDashboardAdmin } from "./LayoutAdminDashboard";
import { useAuthStore } from "@/store/AuthStore";
import { useReservationsStore } from "@/store/ReservationsStore";
import { Reservation } from "@/schemas/reservations";
import { CardNextReservation } from "./CardNextReservation";
import { getDateInfo } from "../../dashboard/utils/getDateInfo";
import Link from "next/link";
import { ButtonViewMore } from "./ButtonViewMore";
import { CardStateCalendar } from "./CardStateCalendar";
import { QUICK_LINKS } from "../utils/quickLinks";
import { CardQuickAccess } from "./CardQuickAccess";
import { getInfoTurns } from "../utils/getInfoTurns";

export const DashboardAdmin = () => {

    const [allReservations, setAllReservations] = useState<Reservation[]>([]);
    const currentSession = useAuthStore(state => state.session);
    const currentGetAllReservations = useReservationsStore(state => state.getAllReservations);
    const [infoTurns, setInfoTurns] = useState({
        turnsToday: 0,
        turnsConfirm: 0
    })

    useEffect(() => {
        if (!currentSession) return;

        const fetchReservations = async () => {
            const professionalId = currentSession.user.id;
            const localReservations = await currentGetAllReservations({ professionalId });
            setAllReservations(localReservations);

            const { turnsToday, turnsConfirm } = getInfoTurns({ reservations: localReservations });
            setInfoTurns({
                turnsToday,
                turnsConfirm
            })

            if (!localReservations.length) {
                return;
            }
        };

        fetchReservations();
    }, [currentSession]);


    return (
        <LayoutDashboardAdmin titleSection="Panel de administración" subtitleSection="Este es un resumen de tu dia">
            <section className="h-[40vh] w-[90%] dashboard-admin-cards flex justify-between gap-x-4">

                <article>
                    <h3 className="font-extrabold">Próximos turnos</h3>
                    {
                        allReservations.length
                            ? (
                                <div className="flex flex-col gap-y-3 mt-3">
                                    {
                                        allReservations.slice(0, 2).map((reservation: Reservation) => {
                                            const { id, start_time, end_time, session_modality } = reservation;
                                            const { date, schedule } = getDateInfo({ start_time, end_time });

                                            return (
                                                <Link href={`/admin/dashboard/reserve/${id}`} key={id}>
                                                    <CardNextReservation
                                                        date={date}
                                                        schedule={schedule}
                                                        fullname="Diego Martins"
                                                        modality={session_modality}
                                                    />
                                                </Link>
                                            )
                                        })
                                    }
                                </div>
                            )
                            : (
                                <div className="mt-2">
                                    <p className="text-[.8rem] opacity-80">Aún no hay turnos asignados</p>
                                </div>
                            )
                    }

                    {
                        allReservations.length
                            ? <div className="flex justify-end mt-5"><ButtonViewMore text="Ver más" route="/admin/dashboard/reservation-history" /></div>
                            : <></>
                    }
                </article>

                <article className="mid-article-cards-admin flex flex-col gap-y-3">
                    <div className="small-card-admin">
                        <h3 className="font-extrabold">Alertas (pagos pendientes)</h3>
                        <p className="mt-2 text-[.8rem] opacity-80">No hay pagos pendientes</p>
                    </div>
                    <div className="small-card-admin">
                        <h3 className="font-extrabold mb-3">Estado de la agenda</h3>
                        <div className="flex flex-col gap-y-2">
                            <CardStateCalendar title="Turnos hoy" quantityTurns={infoTurns.turnsToday} />
                            <CardStateCalendar title="Turnos confirmados" quantityTurns={infoTurns.turnsConfirm} />
                            <CardStateCalendar title="Total de turnos" quantityTurns={allReservations.length} />
                        </div>
                        <div className="flex justify-end mt-4"><ButtonViewMore text="Ver agenda completa" route="/admin/dashboard/calendar" /></div>
                    </div>
                </article>

                <article>
                    <h3 className="font-extrabold">Accesos rápidos</h3>
                    <div className="grid-quick-access pt-5">
                        {QUICK_LINKS.map(({ label, href, icon: Icon }) => (
                            <CardQuickAccess
                                key={label}
                                label={label}
                                href={href}
                                Icon={Icon}
                            />
                        ))}
                    </div>
                </article>

            </section>
        </LayoutDashboardAdmin>
    );

};
