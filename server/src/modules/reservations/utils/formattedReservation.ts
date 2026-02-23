export const formattedReservation = (reservation) => {
    const newReservation = {
        client_id: reservation.client_id,
        professional_id: reservation.professional_id,
        start_time: reservation.start_time,
        end_time: reservation.end_time,
        status: "CONFIRMED",
        session_modality: reservation.session_modality === "VIRTUAL" ? "Virtual" : "Presencial"
    }
    return newReservation;
}