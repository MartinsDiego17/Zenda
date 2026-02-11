import { Reservation } from "@/schemas/reservations";

export const getCurrentReservation = (
  reservations: Reservation[]
): Reservation  => {

  const now = new Date();

  const upcomingReservations = reservations
    .filter(reservation => new Date(reservation.start_time) > now)
    .sort(
      (a, b) =>
        new Date(a.start_time).getTime() -
        new Date(b.start_time).getTime()
    );

  return upcomingReservations[0];
};
