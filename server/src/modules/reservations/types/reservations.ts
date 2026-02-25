
export type SessionModalityToUser = "Virtual" | "Presencial" | "";

export type ReservationStatus = "PENDING" | "CONFIRMED" | "CANCELLED";

export interface Reservation {
    id: string;

    client_id: string;
    professional_id: string;

    start_time: string;
    end_time: string;

    status: ReservationStatus;
    session_modality: SessionModalityToUser;

    created_at: string;
}
