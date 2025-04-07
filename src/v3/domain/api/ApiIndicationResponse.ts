import { IndicationStatus, RedeemStatus } from '../Indication'

import { TApiUserResponse } from './ApiUserResponse'

export interface TApiIndicationResponse {
  id: number
  user_id: number
  user?: TApiUserResponse
  fantasy_name: string
  manager_name: string
  manager_email: string
  manager_phone: string
  state: string
  city: string
  monthly_payment: number
  number_students: number
  status: IndicationStatus
  redeem_status?: RedeemStatus
  request_at?: Date | null
  created_at: Date
  updated_at?: Date | null
}
