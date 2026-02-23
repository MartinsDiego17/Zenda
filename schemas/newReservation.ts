import { UUID, Timestamp } from "./common.types";

export type SessionModalityToUser = "VIRTUAL" | "PRESENTIAL" | "";

export type ReservationStatus = "PENDING" | "CONFIRMED" | "CANCELLED";

export interface NewReservation {
    client_id: UUID;
    professional_id: UUID;
    start_time: Timestamp;
    end_time: Timestamp;
    status: ReservationStatus;
    session_modality: SessionModalityToUser;
}
