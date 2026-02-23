
export type PaymentStatus = "PENDING" | "PAID" | "FAILED";

export interface PaymentProps {
  id: string;

  reservation_id: string;

  amount: number;

  status: PaymentStatus;
  payment_provider: string;
  external_payment_id?: string | null;

  created_at: string;
}
