import { AllergyCategory } from "./AllergyCategory"
import { UserAllergySymptom } from "./UserAllergySymptom"
import { DefaultStatus } from "./api/ApiCourseResponse"
import { TUserAllergy } from "./api/ApiUserAllergyResponse"

export class UserAllergy {
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
  category?: AllergyCategory
  userAllergySymptom?: UserAllergySymptom[]
  
  constructor(params: TUserAllergy) {
    this.id = params.id
    this.userId = params.userId
    this.creatorId = params.creatorId
    this.categoryId = params.categoryId
    this.orientations = params.orientations
    this.causerAgent = params.causerAgent
    this.symptom = params.symptom
    this.allergySymptomId = params.allergySymptomId
    this.status = params.status
    this.createdAt = params.createdAt
    this.updatedAt = params.updatedAt


    if (params.category) this.category = new AllergyCategory(params.category)

    if (params.userAllergySymptom)
      this.userAllergySymptom = params.userAllergySymptom.map(
        (symptom) => new UserAllergySymptom(symptom)
      )
  }

  getFormatedAllergySymptom() {
    if (!this.userAllergySymptom) return ''

    const symptomsNames = this.userAllergySymptom.map((symptom) => symptom.symptom?.name)

    const lastSymptoms = symptomsNames.pop()
    const symptoms = symptomsNames.join(", ")

    return [symptoms, lastSymptoms].filter(Boolean).join(" e ")
  }
}

