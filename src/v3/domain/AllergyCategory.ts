import { TAllergyCategory } from './api/ApiAllergyOptionsResponse'

export class AllergyCategory {
  id: number
  name: string
  createdAt: Date
  updatedAt: Date | null

  constructor(params: TAllergyCategory) {
    this.id = params.id
    this.createdAt = params.created_at
    this.updatedAt = params.updated_at
    this.name = params.name
  }
}
