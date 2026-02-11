import { UUID, Timestamp } from "./common.types";

export type PaymentStatus = "PENDING" | "PAID" | "FAILED";

export interface Payment {
  id: UUID;

  reservation_id: UUID;

  amount: number;

  status: PaymentStatus;
  payment_provider: string;
  external_payment_id?: string | null;

  created_at: Timestamp;
}
