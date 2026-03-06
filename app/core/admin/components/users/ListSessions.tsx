"use client";
import { ResponseUsersReservations } from "@/schemas/ResponseUserReservations";
import { CalendarDays, Users } from "lucide-react";
import { HistoryReservations } from "../reservations/HistoryReservations";
import { useState } from "react";
import { Profile } from "@/schemas/profile";
import { CardUser } from "./CardUser";

interface ListSessionsProps {
    reservations: ResponseUsersReservations[];
    userSelected: Profile | undefined
}

const ITEMS_PER_PAGE = 5;

export const ListSessions = ({ reservations, userSelected }: ListSessionsProps) => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(reservations.length / ITEMS_PER_PAGE);
    const paginated = reservations.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    return (
        <section className="shadow-container">
            <header>
                <h2 className="p-5 border-b flex place-items-center gap-x-4 text-[.8rem] font-bold">
                    <span><CalendarDays size={15} className="opacity-60" /></span>
                    <span>Historial de sesiones</span>
                </h2>
                {
                    userSelected && (
                        <>
                            <CardUser user={userSelected} />
                        </>

                    )
                }
            </header>
            {
                userSelected
                    ? (
                        <HistoryReservations
                            isUsersRoute={true}
                            reservations={paginated}
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    )
                    : (
                        <div className="flex justify-center place-items-center py-20">
                            <p className="flex flex-col justify-center place-items-center">
                                <span><Users size={100} strokeWidth={.5} className="opacity-30 text-(--color-primary)" /></span>
                                <span className="text-[.8rem] opacity-70">Aún no seleccionaste un cliente</span>
                            </p>
                        </div>
                    )
            }
        </section>
    );
};