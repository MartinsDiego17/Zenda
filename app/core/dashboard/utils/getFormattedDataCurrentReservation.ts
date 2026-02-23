import { Reservation } from "@/schemas/reservations"

export interface FormattedReservationProps {
  formattedDate: string
  formattedSchedule: string
  formattedSessionModality: string
}

export const getFormattedDataCurrentReservation = (
  reservation: Reservation | null
): FormattedReservationProps | null => {
  if (!reservation) return null

  const startDate = new Date(reservation.start_time.replace(" ", "T"))

  const formattedDate = startDate
    .toLocaleDateString("es-ES", {
      weekday: "long",
      day: "2-digit",
      month: "long",
    })
    .replace(/^./, c => c.toUpperCase())

  const formattedSchedule =
    startDate.toLocaleTimeString("es-AR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }) + "hs"

  const formattedSessionModality =
    reservation.session_modality === "VIRTUAL"
      ? "Virtual"
      : reservation.session_modality === "PRESENTIAL"
        ? "Presencial"
        : reservation.session_modality

  return {
    formattedDate,
    formattedSchedule,
    formattedSessionModality,
  }
}
