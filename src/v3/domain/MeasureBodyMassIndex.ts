import { TApiMeasureBodyMassIndex } from './api/ApiMeasureBodyMassIndex'
import { DefaultStatus } from './api/ApiCourseResponse'

export class MeasureBodyMassIndex {
  id: number
  weight: number
  height: number
  status: DefaultStatus
  userId: number
  measurementDate: Date | null
  createdAt: Date
  updatedAt: Date | null

  constructor(params: TApiMeasureBodyMassIndex) {
    this.id = params.id
    this.weight = params.weight
    this.height = params.height
    this.status = params.status
    this.userId = params.user_id
    this.measurementDate = params.measurement_date
    this.createdAt = params.created_at
    this.updatedAt = params.updated_at
  }
}
