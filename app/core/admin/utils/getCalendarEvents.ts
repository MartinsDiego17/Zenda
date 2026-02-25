import { Reservation } from "@/schemas/reservations";
export interface InterfaceEventProps {
    start: Date
    end: Date
    title: string
}


export const getCalendarEvents = ({ reservations, }: { reservations: Reservation[]; }): InterfaceEventProps[] => {
        
    return reservations.map((reservation) => ({
        start: new Date(reservation.start_time),
        end: new Date(reservation.end_time),
        title: "Sesión",
    }));

};