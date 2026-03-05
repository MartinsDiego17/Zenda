import { ResponseUsersReservations } from "@/schemas/ResponseUserReservations";
import { TableCell } from "@/components/ui/table";
import { Eye, MapPin, Video } from "lucide-react";
import Link from "next/link";

interface CardReservationHistoryProps {
    reservationByUser: ResponseUsersReservations;
    isUsersRoute: boolean;
}

export const CardReservationHistory = ({ reservationByUser, isUsersRoute }: CardReservationHistoryProps) => {

    const { fullname, date, schedule, modality, status, id, itPast } = reservationByUser;

    return (
        <>
            {/* col-cliente: oculto en la ruta de usuarios */}
            {!isUsersRoute && (
                <TableCell className="col-cliente">
                    <div className="flex place-items-center gap-x-2">
                        <div className="w-fit p-1.5 text-[.8rem] font-bold text-(--color-primary) rounded-full bg-(--color-terciary-transparent)">
                            {fullname[0]}{fullname.split(' ')[1][0]}
                        </div>
                        <h3 className="text-[.9rem] truncate">{fullname}</h3>
                    </div>
                </TableCell>
            )}

            <TableCell className="col-fecha">
                <p className="text-[.8rem] flex place-items-center gap-x-2 flex-wrap">
                    <span>{date}</span>
                    <span>{schedule}</span>
                    {itPast
                        ? <span className="text-[.65rem] border border-[#ccc] text-[#555] py-px rounded-full px-1.5">Pasado</span>
                        : <span className="font-bold text-[.65rem] border border-(--color-primary-transparent) text-(--color-primary) bg-(--color-terciary-transparent) py-px rounded-full px-1.5">Próximo</span>
                    }
                </p>
            </TableCell>

            <TableCell className="col-modalidad">
                <h3 className="flex place-items-center text-[.8rem] gap-x-2">
                    <span>
                        {modality === "Virtual"
                            ? <Video className="text-(--color-primary)" size={15} />
                            : <MapPin className="text-(--color-primary)" size={15} />
                        }
                    </span>
                    <span>{modality}</span>
                </h3>
            </TableCell>

            <TableCell className="col-estado">
                <p className="font-bold w-fit text-[.7rem] text-(--color-primary) px-2 py-0.5 rounded-full bg-(--color-terciary-transparent) border border-(--color-primary-transparent)">
                    {status === "Confirmada" && "Confirmado"}
                </p>
            </TableCell>

            <TableCell className="col-acciones">
                <Link href={`/admin/dashboard/reserve/${id}`} className="w-fit ml-auto block">
                    <p className="eye-container w-fit opacity-80">
                        <Eye size={15} />
                    </p>
                </Link>
            </TableCell>
        </>
    );
};