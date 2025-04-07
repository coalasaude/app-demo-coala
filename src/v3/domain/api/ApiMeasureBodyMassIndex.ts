import { DefaultStatus } from "./ApiCourseResponse"

export interface TApiMeasureBodyMassIndex {
  id: number
  weight: number
  height: number
  user_id: number
  status: DefaultStatus
  measurement_date: Date | null
  created_at: Date
  updated_at: Date | null
}
