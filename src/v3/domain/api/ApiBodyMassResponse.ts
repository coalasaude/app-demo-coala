import { DefaultStatus } from '@/types/status'

export interface TBodyMass {
  id: number
  status: DefaultStatus
  measurement_date: string
  created_at: string
  height: number
  weight: number
}
