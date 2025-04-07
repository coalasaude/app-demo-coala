import { AllergySymptomModel, AllergySymptomModelConstructor } from './allergy-symptom.model'

export interface AllergySymptomBrowseModelConstructor {
  data: AllergySymptomModelConstructor[]
}

export class AllergySymptomBrowseModel {
  public readonly data: AllergySymptomModel[]

  constructor(params: AllergySymptomBrowseModelConstructor) {
    this.data = params.data.map((user) => new AllergySymptomModel(user))
  }
}
