"use client";
import { FooterCommon } from "../../footer/components/FooterCommon";
import { HeaderDashboardUser } from "../../header/components/HeaderDashboardUser";
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

    return (
        <div className="dashboard-container flex place-items-center justify-center">
            <HeaderDashboardUser />

            <div className="dashboard-son flex place-items-center justify-between my-[13vh] w-[70vw] mb-[35vh]  h-[70vh]">

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

            <FooterCommon />

        </div>
    );
};
