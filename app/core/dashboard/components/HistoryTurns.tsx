import { Reservation } from "@/schemas/reservations";
import { TableTurns } from "./TableTurns";
import "./dashboard.css";

interface props {
    reservations: Reservation[]
}


export const HistoryTurns = ({ reservations }: props) => {
    return (
        <div className="w-[68%] history-turns ">
            <div className="mb-5">
                <h2 className="text-(--color-primary-text) font-extrabold mb-2">Historial de turnos</h2>
                <p className="opacity-70 text-[.8rem]">Listado de tu historial de turnos</p>
            </div>
            <TableTurns reservations={reservations} />
        </div>
    );
};
