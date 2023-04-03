import { Voucher } from './voucher'

export type Ticket = {
  id: string
  user_id: string
  amount: number
  used_at: number | null
  pointVoucher_id: string
  pointVoucher: Voucher
}
