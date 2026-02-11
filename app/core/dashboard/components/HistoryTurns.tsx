import { Reservation } from "@/schemas/reservations";
import { TableTurns } from "./TableTurns";

interface props {
    reservations: Reservation[]
}


export const HistoryTurns = ({ reservations }: props) => {
    return (
        <div className="w-[70%] h-full pl-20">
            <h2 className="text-(--color-primary-text) text-2xl mb-10">
                Historial de turnos
            </h2>
            <TableTurns reservations={reservations} />
        </div>
    );
};
