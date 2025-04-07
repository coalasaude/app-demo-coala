
import { TAllergySymptom } from './api/ApiAllergyOptionsResponse'

export class AllergySymptom {
  id: number
  name: string
  createdAt: Date
  updatedAt: Date | null

  constructor(params: TAllergySymptom) {
    this.id = params.id
    this.createdAt = params.created_at
    this.updatedAt = params.updated_at
    this.name = params.name
  }
}
