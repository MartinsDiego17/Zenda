import { UUID, Timestamp, TimeString } from "./common.types";

export type SessionModality = "VIRTUAL" | "PRESENTIAL" | "BOTH";

export interface ProfessionalSettings {
  id: UUID;
  user_id: UUID;

  session_duration_minutes: number;
  work_days: string; // e.g. "MON-FRI"
  work_start_time: TimeString;
  work_end_time: TimeString;

  reservation_window_days: number;

  requires_deposit: boolean;
  deposit_amount?: number | null;

  session_modalities: SessionModality;
  office_address?: string | null;

  created_at: Timestamp;
}
