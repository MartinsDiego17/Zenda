import { CalendarCheck, Clock, User, Video, MapPin } from "lucide-react";

interface props {
    date: string
    schedule: string
    fullname: string
    modality: string
}

export const CardNextReservation = ({ date, schedule, fullname, modality }: props) => {
    return (
        <div className="card-next-turn-admin">
            <h4 className="text-[.8rem] pb-2 font-semibold flex place-items-center gap-x-2">
                <span><CalendarCheck className="size-4 text-(--color-primary)" /></span>
                <span>{date}</span>
            </h4>
            <div className="flex flex-col gap-y-1">
                <p className="text-[.75rem] flex place-items-center gap-x-2">
                    <span><Clock size={12} /></span>
                    <span>{schedule}</span>
                </p>
                <p className="text-[.75rem] flex place-items-center gap-x-2">
                    <span><User size={12} /></span>
                    <span>{fullname}</span>
                </p>
                <p className="text-[.75rem] flex place-items-center gap-x-2">
                    <span>
                        {
                            modality === "Virtual" 
                            ? (<Video size={12} />)
                            : (<MapPin size={12} />)
                        }
                    </span>
                    <span>{modality}</span>
                </p>
            </div>
        </div>

    );
};
