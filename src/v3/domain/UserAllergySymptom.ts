import { AllergySymptom } from "./AllergySymptom"
import { UserAllergy } from "./UserAllergy"
import { TUserAllergySymptom } from "./api/ApiUserAllergyResponse"

export class UserAllergySymptom {
  id: number
  userAllergyId: number
  symptomId: number
  allergy?: UserAllergy
  symptom?: AllergySymptom

  constructor(params: TUserAllergySymptom) {
    this.id = params.id
    this.userAllergyId = params.user_allergy_id
    this.symptomId = params.symptom_id

    if (params.symptom) this.symptom = new AllergySymptom(params.symptom)
    if (params.allergy) this.allergy = new UserAllergy(params.allergy)
  }
}
