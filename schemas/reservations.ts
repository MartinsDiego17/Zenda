import { UUID, Timestamp } from "./common.types";
import { SessionModality } from "./professional_settings";

export type ReservationStatus = "PENDING" | "CONFIRMED" | "CANCELLED";

export interface Reservation {
  id: UUID;

  client_id: UUID;
  professional_id: UUID;

  start_time: Timestamp;
  end_time: Timestamp;

  status: ReservationStatus;
  session_modality: SessionModality;

  created_at: Timestamp;
}
