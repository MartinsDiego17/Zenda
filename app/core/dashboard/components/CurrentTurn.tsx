import { Reservation } from "@/schemas/reservations";
import { getDateInfo } from "../utils/getDateInfo";
import { ArrowRight, CalendarPlus } from "lucide-react";
import { ButtonPrimary } from "../../web-components/ButtonPrimary";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { NextAppointmentCard } from "./NextAppointmentCard";

interface props {
    reservation: Reservation | null
}

export const CurrentTurn = ({ reservation }: props) => {

    const dateInfo = getDateInfo({ start_time: reservation?.start_time || "", end_time: reservation?.end_time || "" });

    let renderStatus = "";
    let showButtonPending = false;
    if (reservation?.status === "PENDING") {
        showButtonPending = true;
        renderStatus = "Pendiente de pago"
    };
    if (reservation?.status === "CONFIRMED") renderStatus = "Confirmado";
    if (reservation?.status === "CANCELLED") renderStatus = "Cancelado";

    return (
        <div className="currentTurn-container h-fit flex flex-col place-items-center w-[30%]">
            <div className="flex justify-between place-items-center w-full">
                <h2 className="text-(--color-primary-text) font-extrabold text-center">Siguiente turno</h2>
                <Badge className="badge-status flex place-items-center gap-x-1 justify-between px-3 py-1">
                    <div className="w-1.25 h-1.25 rounded-full bg-(--color-primary)"></div>
                    <span>{renderStatus}</span>
                </Badge>
            </div>

            <NextAppointmentCard appointment={{ date: dateInfo.date, time: dateInfo.schedule, modality: reservation?.session_modality || "" }} />

            <div className="mt-10 w-full">
                <Link href={"/dashboard/reserve"}>
                    <ButtonPrimary>
                        <span><CalendarPlus /></span>
                        <span>Reservar nuevo turno</span>
                    </ButtonPrimary>
                </Link>
                {showButtonPending &&
                    <Link href={"/dashboard/reserve/payment"}>
                        <button className="text-[#666] cursor-pointer hover:scale-[.95] button-pending-pay text-center mt-5 text-[.8rem] flex place-items-center justify-center gap-x-2">
                            <span>finalizar pago</span>
                            <span><ArrowRight size={13} strokeWidth={1} /></span>
                        </button>
                    </Link>
                }
            </div>
        </div>
    );
};
