"use client";
import { EmptyTurn } from "./EmptyTurn";
import { CurrentTurn } from "./CurrentTurn";
import "./dashboard.css"
import { HistoryTurns } from "./HistoryTurns";
import { useEffect, useState } from "react";
import { Reservation } from "@/schemas/reservations";
import { useAuthStore } from "@/store/AuthStore";
import { useReservationsStore } from "@/store/ReservationsStore";
import { getCurrentReservation } from "../utils/getCurrentReservation";
import { SkeletonCurrentReservation } from "./SkeletonCurrentReservation";
import { SkeletonHistoryReservations } from "./SkeletonHistoryReservations";
import { LayoutDashboardUser } from "./LayoutDashboardUser";

export const DashboardUser = () => {

    const currentSession = useAuthStore(state => state.session);
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [currentReservation, setCurrentReservation] = useState<Reservation>();
    const currentGetReservations = useReservationsStore(state => state.getReservations);


    useEffect(() => {
        if (!currentSession) return;

        const fetchReservations = async () => {
            const client_id = currentSession.user.id;
            const localReservations = await currentGetReservations({ client_id });
            setReservations(localReservations);

            if (!localReservations.length) {
                return;
            }
            const nextReservation: Reservation = getCurrentReservation(localReservations);
            setCurrentReservation(nextReservation);
        };

        fetchReservations();
    }, [currentSession]);

    const firstName = currentSession ? currentSession.user.user_metadata.full_name.split(" ")[0] : ""

    return (
        <LayoutDashboardUser
            titleSection={`Hola, bienvenido ${firstName}`}
            subtitleSection="Gestiona tus turnos y revisa tu historial de sesiones"
        >
            <div className="flex justify-between h-full w-full max-h-screen">

                {
                    currentSession
                        ? (
                            <>
                                {
                                !currentReservation
                                        ? (
                                            <EmptyTurn />
                                        )
                                        : (
                                            <CurrentTurn reservation={currentReservation || null} />
                                        )
                                }
                                <HistoryTurns reservations={reservations} />
                            </>
                        )
                        : (
                            <>
                                <SkeletonCurrentReservation />
                                <SkeletonHistoryReservations />
                            </>
                        )
                }
            </div>
        </LayoutDashboardUser>
    );
};

