import { Reservation } from "@/schemas/reservations";
export interface InterfaceEventProps {
  id: string;          
  start: Date;
  end: Date;
  title: string;
}


export const getCalendarEvents = ({ reservations, professionalId, }: { reservations: Reservation[], professionalId: string }): InterfaceEventProps[] => {
        
    return reservations.map((reservation) => ({
        id: reservation.id,
        start: new Date(reservation.start_time),
        end: new Date(reservation.end_time),
        title: reservation.client_id !== professionalId ? "Sesión" : "Bloqueo manual",
    }));

};