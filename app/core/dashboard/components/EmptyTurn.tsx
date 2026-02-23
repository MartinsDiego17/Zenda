import Link from "next/link";
import { ButtonPrimary } from "../../web-components/ButtonPrimary";
import { CalendarIcon } from "lucide-react";

export const EmptyTurn = () => {
    return (
        <div className="empty-turn-container w-[30%] h-fit flex flex-col place-items-center">
            <h2 className="font-extrabold text-(--color-primary-text)  text-center mb-10">
                No tienes turnos vigentes
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
