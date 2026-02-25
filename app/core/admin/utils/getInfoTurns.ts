import { Reservation } from "@/schemas/reservations";

export const getInfoTurns = ({ reservations, professionalId }: { reservations: Reservation[], professionalId: string }) => {
  const now = new Date();

  const startOfToday = new Date(now);
  startOfToday.setHours(0, 0, 0, 0);

  const endOfToday = new Date(now);
  endOfToday.setHours(23, 59, 59, 999);

  let turnsToday = 0;
  let turnsConfirm = 0;
  let totalTurns = 0;

  for (const reservation of reservations) {
    if (reservation.client_id !== professionalId) {

      totalTurns++;
      const startTime = new Date(reservation.start_time);

      if (startTime >= startOfToday && startTime <= endOfToday) {
        turnsToday++;
      }

      if (
        reservation.status === "CONFIRMED" &&
        startTime >= now
      ) {
        turnsConfirm++;
      }
    } 
  }

  return {
    turnsToday,
    turnsConfirm,
    totalTurns
  };
};