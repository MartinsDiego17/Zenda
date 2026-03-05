import Link from "next/link";
import { CalendarIcon } from "lucide-react";
import { ButtonPrimary } from "@/app/core/web-components/ButtonPrimary";

export const EmptyTurn = () => {
    return (
        <div className="empty-turn-container w-[30%] h-fit flex flex-col place-items-center">
            <h2 className="font-extrabold text-(--color-primary-text)  text-center mb-10">
                No tenés turnos vigentes
            </h2>
            <Link href={"/dashboard/reserve"}>
                <ButtonPrimary>
                    <span><CalendarIcon /></span>
                    <span>Reservar nuevo turno</span>
                </ButtonPrimary>
            </Link>
        </div>
    );
};
