import { ResponseUsersReservations } from "@/schemas/ResponseUserReservations";
import { Eye, MapPin, Video } from "lucide-react";
import Link from "next/link";

interface CardReservationHistoryProps {
    reservationByUser: ResponseUsersReservations
    isUsersRoute: boolean
}

export const CardReservationHistory = ({ reservationByUser, isUsersRoute }: CardReservationHistoryProps) => {

    const { fullname, date, schedule, modality, status, id, itPast } = reservationByUser;

    return (
        <>
            {
                !isUsersRoute && (
                    <li className={`${!isUsersRoute ? "w-[20%]" : " w-[25%]"}`}>
                        <div className="flex place-items-center gap-x-2">
                            <div
                                className="w-fit p-1.5 text-[.8rem] font-bold text-(--color-primary) rounded-full bg-(--color-terciary-transparent)">
                                {fullname[0]}{fullname.split(' ')[1][0]}
                            </div>
                            <h3 className="text-[.9rem]">{fullname}</h3>
                        </div>
                    </li>
                )
            }

            <li  className={`${!isUsersRoute ? "w-[25%]" : " w-[45%]"}`}>
                <div>
                    <p className="text-[.8rem] flex place-items-center gap-x-2">
                        <span>{date}</span>
                        <span>{schedule}</span>
                        {
                            itPast
                                ? <span className="text-[.65rem] border border-[#ccc] text-[#555] py-px rounded-full px-1.5">Pasado</span>
                                : <span className="font-bold text-[.65rem] border border-(--color-primary-transparent) text-(--color-primary) bg-(--color-terciary-transparent) py-px rounded-full px-1.5">Próximo</span>
                        }
                    </p>
                </div>
            </li>

            <li className={`${!isUsersRoute ? "w-[15%]" : " w-[25%]"}`}>
                <h3 className="flex place-items-center text-[.8rem] gap-x-2">
                    <span>
                        {
                            modality === "Virtual"
                                ? <Video className="text-(--color-primary)" size={15} />
                                : <MapPin className="text-(--color-primary)" size={15} />
                        }
                    </span>
                    <span>{modality}</span>
                </h3>
            </li>

            <li className={`${!isUsersRoute ? "w-[20%]" : " w-[25%]"}`}>
                <div>
                    <p
                        className="font-bold w-fit text-[.7rem] text-(--color-primary) px-2 py-0.5 rounded-full bg-(--color-terciary-transparent) border border-(--color-primary-transparent)"
                    >
                        {status === "Confirmada" && "Confirmado"}
                    </p>
                </div>
            </li>

            <li className={`${!isUsersRoute ? "w-[20%] flex justify-end" : "w-[10%] flex justify-end"}`}>
                <Link href={`/admin/dashboard/reserve/${id}`}>
                    <p className="eye-container opacity-80">
                        <Eye size={15} />
                    </p>
                </Link>
            </li>
        </>
    );
};
