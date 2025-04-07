
import { TApiScheduledMedicine } from './api/ApiMedicineOptionsResponse'

export class ScheduledMedicine {
  id: number
  name: string
  createdAt: Date
  updatedAt: Date | null

  constructor(params: TApiScheduledMedicine) {
    this.id = params.id
    this.createdAt = params.createdAt
    this.updatedAt = params.updatedAt
    this.name = params.name
  }
}
