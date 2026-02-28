"use client";
import { ResponseUsersReservations } from "@/schemas/ResponseUserReservations";
import { CalendarDays, Mail, User, Users } from "lucide-react";
import { HistoryReservations } from "../reservations/HistoryReservations";
import { useState } from "react";
import { Profile } from "@/schemas/profile";

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
                        <div className={"px-5 py-2 flex place-items-center border-b gap-x-4"}>

                            <div className="flex place-items-center gap-x-2">
                                <div className="avatar border border-transparent p-2.5 text-(--color-primary) font-bold text-[.7rem] rounded-full bg-(--color-terciary-transparent)">
                                    {userSelected.full_name[0]}{userSelected.full_name.split(" ")[1][0]}
                                </div>
                                <h3 className="text-[.8rem] name-current-user ">{userSelected.full_name}</h3>
                            </div>

                            <h3 className="flex place-items-center gap-x-2 w-[60%] opacity-60 text-[.8rem]">
                                <span><Mail size={12} /></span>
                                <span>{userSelected.email}</span>
                            </h3>

                        </div>
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