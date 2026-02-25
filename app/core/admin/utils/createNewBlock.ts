import { serverConfig } from "@/lib/serverConfig";
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

  const start_time = new Date(`${date}T${start}:00`).toISOString();
  const end_time = new Date(`${date}T${end}:00`).toISOString();

  const reservation  : NewReservation = {
    client_id: professionalId,
    professional_id: professionalId,
    start_time,
    end_time,
    status: "CONFIRMED" as const,
    session_modality: "Virtual" as const,
  };

  const reservationCreated = await createReservation({ newReservation: reservation });

  return reservation;
};