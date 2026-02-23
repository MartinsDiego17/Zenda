import { UUID, Timestamp } from "./common.types";

export type SessionModalityToUser = "Virtual" | "Presencial" | "";

export type ReservationStatus = "PENDING" | "CONFIRMED" | "CANCELLED";

export interface Reservation {
  id: UUID;

  client_id: UUID;
  professional_id: UUID;

  start_time: Timestamp;
  end_time: Timestamp;

  status: ReservationStatus;
  session_modality: SessionModalityToUser;

  created_at: Timestamp;
}
