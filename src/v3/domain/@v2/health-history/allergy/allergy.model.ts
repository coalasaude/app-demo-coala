import { AllergyCategoryModel, AllergyCategoryModelConstructor } from './allergy-category.model'
import { AllergySymptomModel, AllergySymptomModelConstructor } from './allergy-symptom.model'

export interface AllergyModelConstructor {
  id: number
  orientations: string
  causerAgent: string
  symptoms: AllergySymptomModelConstructor[]
  category: AllergyCategoryModelConstructor
}

export class AllergyModel {
  public readonly id: number
  public readonly orientations: string
  public readonly causerAgent: string
  public readonly symptoms: AllergySymptomModel[]
  public readonly category: AllergyCategoryModel

  constructor(props: AllergyModelConstructor) {
    this.id = props.id
    this.orientations = props.orientations
    this.causerAgent = props.causerAgent
    this.symptoms = props.symptoms.map((symptom) => new AllergySymptomModel(symptom))
    this.category = props.category && new AllergyCategoryModel(props.category)
  }

  getFormattedAllergySymptom() {
    const symptomsNames = this.symptoms.map((symptom) => symptom.name)
    const lastSymptoms = symptomsNames.pop()
    const symptoms = symptomsNames.join(', ')

    return [symptoms, lastSymptoms].filter(Boolean).join(' e ')
  }
}
