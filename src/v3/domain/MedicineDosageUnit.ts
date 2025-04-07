
import { TApiMedicineDosageUnit } from './api/ApiMedicineOptionsResponse'

export class MedicineDosageUnit {
  id: number
  name: string
  createdAt: Date
  updatedAt: Date | null

  constructor(params: TApiMedicineDosageUnit) {
    this.id = params.id
    this.createdAt = params.createdAt
    this.updatedAt = params.updatedAt
    this.name = params.name
  }
}
