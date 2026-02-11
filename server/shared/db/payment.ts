export interface PaymentTable {
  id: string
  reservation_id: string
  amount: number
  status: string
  payment_provider: string
  external_payment_id: string
  created_at: string
}
