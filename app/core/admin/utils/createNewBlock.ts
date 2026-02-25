import { NewReservation } from "@/schemas/newReservation";
import { createReservation } from "../../dashboard/utils/createReservation";

interface Props {
  block: {
    date: string;   // "2026-02-25"
    start: string;  // "09:45"
    end: string;    // "11:00"
  };
  professionalId: string;
}

export const createNewBlock = async ({ block, professionalId }: Props) => {
  const { date, start, end } = block;

  const reservation: NewReservation = {
    client_id: professionalId,
    professional_id: professionalId,
    start_time: `${date}T${start}:00`,
    end_time: `${date}T${end}:00`,
    status: "CONFIRMED",
    session_modality: "Virtual",
  };

  const reservationCreated = await createReservation({ newReservation: reservation });
  return reservationCreated;
};