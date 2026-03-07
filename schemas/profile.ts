import { UUID, Timestamp } from "./common.types";

export type UserRole = "USER" | "ADMIN";

export interface Profile {
  id: UUID;
  email: string;
  full_name: string;
  role: UserRole;
  is_active: boolean;
  birth_date: string
  is_profile_complete: boolean
  created_at: Timestamp;
}
