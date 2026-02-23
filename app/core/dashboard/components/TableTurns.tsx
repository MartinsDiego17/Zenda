import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Reservation } from "@/schemas/reservations"
import { getDateInfo } from "../utils/getDateInfo"
import { Video, MapPin } from "lucide-react"


interface props {
    reservations: Reservation[]
}

export const TableTurns = ({ reservations }: props) => {
    return (
        <div id="table-turns-container" className="max-h-[80%] border border-[#eee] rounded-[15px] p-4 pt-1 overflow-y-auto">

            <Table>
                <TableCaption>
                    <span>Mostrando {reservations.length} turno</span>
                    {
                        reservations.length > 1 || !reservations.length
                            ? <>s{" "}</>
                            : <>{" "}</>
                    }
                    en tu historial
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="font-bold  opacity-60 text-[.8rem] w-[25%]">FECHA</TableHead>
                        <TableHead className="font-bold  opacity-60 text-[.8rem] w-[25%]">MODALIDAD</TableHead>
                        <TableHead className="font-bold  opacity-60 text-[.8rem] w-[25%]">ESTADO</TableHead>
                        <TableHead className="font-bold  opacity-60 text-[.8rem] w-[25%]">HORARIO</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody >

                    {
                        reservations.length
                            ? (
                                <>
                                    {reservations.map((reser) => {
                                        const { id, start_time, end_time, session_modality, status } = reser;
                                        const localDateInfo = getDateInfo({ start_time, end_time });
                                        const { date, schedule } = localDateInfo;

                                        const isPast = new Date(start_time).getTime() < new Date().getTime();

                                        let renderStatus = "";
                                        if (status === "PENDING") renderStatus = "Pendiente de pago";
                                        if (status === "CONFIRMED") renderStatus = "Confirmado";
                                        if (status === "CANCELLED") renderStatus = "Cancelado";

                                        return (
                                            <TableRow className={isPast ? "opacity-50 cursor-none" : "opacity-90"} key={id} >
                                                <TableCell className="font-semibold text-[.8rem]" >{date}</TableCell>
                                                <TableCell className="text-[.8rem] flex place-items-center gap-x-1" >
                                                    <span>
                                                        {
                                                            session_modality == "Virtual"
                                                            ? <Video className="size-3.5 text-(--color-primary)" />
                                                            : <MapPin className="size-3.5 text-(--color-primary)" />
                                                        }
                                                    </span>
                                                    <span>{session_modality}</span>
                                                </TableCell>
                                                <TableCell>
                                                    <span className="rounded-full border border-(--color-primary-transparent) px-2 py-1 text-[.7rem] bg-(--color-secondary-transparent) text-(--color-primary)">
                                                        {renderStatus}
                                                    </span>
                                                </TableCell>
                                                <TableCell className="opacity-80 text-[.8rem]" >{schedule}</TableCell>
                                            </TableRow>
                                        );
                                    })}

                                </>
                            )
                            : (
                                <TableRow>
                                    <TableCell colSpan={4} className="py-10 text-center hover:none">
                                        No tienes reservas en tu historial.
                                    </TableCell>
                                </TableRow>
                            )
                    }

                </TableBody>

            </Table >
        </div >

    )
}
