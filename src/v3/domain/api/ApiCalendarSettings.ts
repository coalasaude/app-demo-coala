import { TAvailableDays } from '@/v3/presentation/pages/mental-health/utils/days'

export interface TApiCalendarSettings {
  id: number
  day: TAvailableDays
  startTime: string
  endTime: string
  userId: number
  createdAt: string
  updatedAt: string
}
