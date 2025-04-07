import { TAllergyCategory, TAllergySymptom } from "./ApiAllergyOptionsResponse"
import { DefaultStatus } from "./ApiCourseResponse"


export interface TUserAllergySymptom {
  id: number
  allergy: TUserAllergy
  user_allergy_id: number
  symptom: TAllergySymptom
  symptom_id: number
}

export interface TUserAllergy {
  id: number
  userId: number
  creatorId: number | null
  categoryId: number
  orientations: string
  causerAgent: string
  status: DefaultStatus
  allergySymptomId: number | null
  symptom: number[]
  createdAt: Date
  updatedAt: Date | null
  category?: TAllergyCategory
  userAllergySymptom?: TUserAllergySymptom[]
}
