import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Reservation } from "@/schemas/reservations"
import { getDateInfo } from "../utils/getDateInfo"


interface props {
    reservations: Reservation[]
}

export const TableTurns = ({ reservations }: props) => {
    return (
        <Table>
            <TableCaption>Listado de tu historial de turnos.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="font-bold  w-[25%]">Fecha</TableHead>
                    <TableHead className="font-bold  w-[25%]">Modalidad</TableHead>
                    <TableHead className="font-bold  w-[25%]">Estado</TableHead>
                    <TableHead className="font-bold  w-[25%]">Horario</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>

                {
                    reservations.length 
                    ? (
                <>
                    {reservations.map((reser) => {
                        const { id, start_time, end_time, session_modality, status } = reser;
                        const localDateInfo = getDateInfo({ start_time, end_time });
                        const { date, schedule } = localDateInfo;

                        let renderStatus = "";
                        if (status === "PENDING") renderStatus = "Pendiente de pago";
                        if (status === "CONFIRMED") renderStatus = "Confirmado";
                        if (status === "CANCELLED") renderStatus = "Cancelado";

                        return (
                            <TableRow key={id}>
                                <TableCell className="opacity-70">{date}</TableCell>
                                <TableCell className="opacity-70">{session_modality}</TableCell>
                                <TableCell className="opacity-70">{renderStatus}</TableCell>
                                <TableCell className="opacity-70">{schedule}</TableCell>
                            </TableRow>
                        )
                    }
                    )}
                </>
                    )
                    : (
                        <TableCell className="py-10">No tienes reservas en tu historial.</TableCell>
                    )
                }



            </TableBody>

        </Table>
    )
}
