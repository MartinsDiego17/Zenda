import { Reservation } from "@/schemas/reservations";
import { getDateInfo } from "../utils/getDateInfo";
import { CalendarIcon, ArrowRight } from "lucide-react";
import { ButtonPrimary } from "../../web-components/ButtonPrimary";
import Link from "next/link";

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
        <div className="currentTurn-container h-full flex flex-col place-items-center w-[30%]">
            <h2 className="text-(--color-primary-text) text-2xl text-center mb-3">
                Siguiente turno
            </h2>
            <h3>{renderStatus}</h3>
            <div className="flex flex-col justify-center place-items-center mt-10 opacity-60 dateInfo">
                <p>{dateInfo.date}</p>
                <p>{dateInfo.schedule}</p>
            </div>
            <h3 className="mt-10">{reservation?.session_modality}</h3>
            <div className="mt-30 w-full flex flex-col place-items-center">
                <Link href={"/dashboard/reserve"}>
                    <ButtonPrimary>
                        <span><CalendarIcon /></span>
                        <span>Reservar nuevo turno</span>
                    </ButtonPrimary>
                </Link>
                {showButtonPending &&
                    <button className="text-[#666] cursor-pointer hover:scale-[.95] button-pending-pay text-center mt-5 text-[.8rem] flex place-items-center justify-center gap-x-2">
                        <span>finalizar pago</span>
                        <span><ArrowRight size={13} strokeWidth={1} /></span>
                    </button>
                }
            </div>
        </div>
    );
};
