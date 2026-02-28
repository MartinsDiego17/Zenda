import { ResponseUsersReservations } from "@/schemas/ResponseUserReservations";
import { CardReservationHistory } from "./CardReservationHistory";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
} from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ITEMS_PER_PAGE = 8;

interface HistoryReservationsProps {
    reservations: ResponseUsersReservations[];
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    isUsersRoute: boolean
}

export const HistoryReservations = ({
    reservations,
    currentPage,
    totalPages,
    onPageChange,
    isUsersRoute = false
}: HistoryReservationsProps) => {

    const getPageNumbers = (): (number | "ellipsis")[] => {
        return Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(page => {
                if (totalPages <= 5) return true;
                if (page === 1 || page === totalPages) return true;
                if (Math.abs(page - currentPage) <= 1) return true;
                return false;
            })
            .reduce<(number | "ellipsis")[]>((acc, page, idx, arr) => {
                if (idx > 0 && page - (arr[idx - 1] as number) > 1) acc.push("ellipsis");
                acc.push(page);
                return acc;
            }, []);
    };

    return (
        <section className="history-reservations-container h-fit">

            <article className="w-full border-b">
                <ul className="header-titles-reservations py-5 flex justify-between px-5">
                    {!isUsersRoute && <li className={`${!isUsersRoute ? "w-[20%]" : "w-[25%]"}`}>Cliente</li>}
                    <li className={`${!isUsersRoute ? "w-[25%]" : "w-[45%]"}`}>Fecha y horario</li>
                    <li className={`${!isUsersRoute ? "w-[15%]" : "w-[25%]"}`}>Modalidad</li>
                    <li className={`${!isUsersRoute ? "w-[20%]" : "w-[25%]"}`}>Estado de pago</li>
                    <li className={`flex justify-end ${!isUsersRoute ? "w-[20%]" : "w-[10%]"}`}>Acciones</li>
                </ul>
            </article>

            <article>
                <ul>
                    {reservations?.length ? (
                        reservations.map(res => (
                            <ul className="border-b place-items-center px-5 py-3 flex current-reservation-history" key={res.id}>
                                <CardReservationHistory reservationByUser={res} isUsersRoute={isUsersRoute} />
                            </ul>
                        ))
                    ) : (
                        <p className="p-5 opacity-70 text-[.8rem]">Todavía no hay reservas creadas</p>
                    )}
                </ul>
            </article>

            {totalPages > 1 && (
                <article className="flex justify-between place-items-center py-4 px-5 border-t">
                    <p className="w-[10vw] text-[.8rem] opacity-60">
                        Mostrando {Math.min(currentPage * ITEMS_PER_PAGE, reservations.length)} de {reservations.length} reservas
                    </p>

                    <div className="1/2">
                        <Pagination className="flex justify-end">
                            <PaginationContent className="gap-1">

                                <PaginationItem className="flex place-items-center">
                                    <button
                                        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                                        className={currentPage === 1 ? "flex place-items-center pointer-events-none opacity-50" : "cursor-pointer"}
                                        aria-label="Volver"
                                    >
                                        <ChevronLeft size={20} />
                                    </button>
                                </PaginationItem>

                                {getPageNumbers().map((item, idx) =>
                                    item === "ellipsis" ? (
                                        <PaginationItem key={`ellipsis-${idx}`}>
                                            <PaginationEllipsis />
                                        </PaginationItem>
                                    ) : (
                                        <PaginationItem key={item}>
                                            <PaginationLink
                                                onClick={() => onPageChange(item)}
                                                isActive={currentPage === item}
                                                className={`border bg-(--color-terciary-transparent) border-transparent hover:bg-(--color-primary-transparent) ${currentPage !== item && "bg-transparent hover:bg-transparent border-[#ddd] cursor-pointer"}`}
                                            >
                                                {item}
                                            </PaginationLink>
                                        </PaginationItem>
                                    )
                                )}

                                <PaginationItem className="flex place-items-center">
                                    <button
                                        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
                                        className={currentPage === totalPages ? "flex place-items-center pointer-events-none opacity-50" : "cursor-pointer"}
                                    >
                                        <ChevronRight size={20} />
                                    </button>
                                </PaginationItem>

                            </PaginationContent>
                        </Pagination>
                    </div>
                </article>
            )}
        </section>
    );
};