"use client";
import { ResponseUsersReservations } from "@/schemas/ResponseUserReservations";
import { useEffect, useState } from "react";
import { fecthUsersReservations } from "../../utils/fetchUsersReservations";
import { useReservationsStore } from "@/store/ReservationsStore";
import { HistoryReservations } from "./HistoryReservations";


const ITEMS_PER_PAGE = 8;
export const ListSessionsGeneral = () => {
    const currentReservations = useReservationsStore(state => state.allReservations);
    const [localReservations, setLocalReservations] = useState<ResponseUsersReservations[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if (currentReservations.length) {
            const fetchData = async () => {
                const response = await fecthUsersReservations({ reservations: currentReservations });
                setLocalReservations(response);
            };
            fetchData();
        }
    }, [currentReservations]);

    const totalPages = Math.ceil(localReservations.length / ITEMS_PER_PAGE);
    const paginated = localReservations.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    return (
        <div className="shadow-container w-[70vw]">
            <HistoryReservations
                isUsersRoute={false}
                reservations={paginated}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    );
};