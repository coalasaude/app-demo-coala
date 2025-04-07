import { FirstFillingStepStatus, FirstFillingType } from '../UserFirstFills'

export interface TApiUserFirstFillsResponse {
  id: number
  userId: number
  step: string
  status: FirstFillingStepStatus
  type: FirstFillingType
  createdAt: Date
  updatedAt: Date | null
}
