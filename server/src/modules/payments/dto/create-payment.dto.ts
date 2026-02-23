import { PaymentProps, PaymentStatus } from "../../../../shared/db/payment";

export class CreatePaymentDto
  implements Pick<
    PaymentProps,
    | "reservation_id"  
    | "amount"
    | "status"
    | "payment_provider"
    | "external_payment_id"
  >
{
  reservation_id: string;
  amount: number;
  status: PaymentStatus;
  payment_provider: string;
  external_payment_id?: string | null;
}
