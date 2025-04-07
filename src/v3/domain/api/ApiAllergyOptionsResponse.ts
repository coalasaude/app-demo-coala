export interface TAllergyCategory {
  id: number
  name: string
  created_at: Date
  updated_at: Date | null
}

export interface TAllergySymptom {
  id: number
  name: string
  created_at: Date
  updated_at: Date | null
}

export interface TApiAllergyOptionsResponse {
  category: TAllergyCategory[]
  symptoms: TAllergySymptom[]
}
