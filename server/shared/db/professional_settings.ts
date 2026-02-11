export interface ProfessionalSettingsTable {
  id: string
  user_id: string
  session_duration: number
  work_days: string
  work_start_time: string
  work_end_time: string
  reservation_window: number
  requires_deposit: boolean
  deposit_amount: number | null
  session_mode: string
  office_address: string | null
  created_at: string
}
