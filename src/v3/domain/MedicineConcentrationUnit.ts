
import { TApiMedicineConcentrationUnit } from './api/ApiMedicineOptionsResponse'

export class MedicineConcentrationUnit {
  id: number
  name: string
  createdAt: Date
  updatedAt: Date | null

  constructor(params: TApiMedicineConcentrationUnit) {
    this.id = params.id
    this.createdAt = params.createdAt
    this.updatedAt = params.updatedAt
    this.name = params.name
  }
}
