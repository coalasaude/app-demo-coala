import { InterestAreaCategory } from '../../enums/pedagogical-area-type.enum'

export interface MentalHealthAreaOfInterestReadModelConstructor {
  id: number
  category: InterestAreaCategory
  interestSubjects?: { id: number; name: string }[]
  proficientSubjects?: { id: number; name: string }[]
  observation?: string
  proficients?: string
  interests?: string
  title?: string
}

export class MentalHealthAreaOfInterestReadModel {
  public readonly id: number
  public readonly category: InterestAreaCategory
  public readonly observation?: string
  public readonly interestSubjects?: { id: number; name: string }[]
  public readonly proficientSubjects?: { id: number; name: string }[]
  public readonly interests?: string
  public readonly proficients?: string
  public readonly title?: string

  constructor(props: MentalHealthAreaOfInterestReadModelConstructor) {
    this.id = props.id
    this.category = props.category
    this.observation = props.observation
    this.interestSubjects = props.interestSubjects
    this.proficientSubjects = props.proficientSubjects
    this.interests = props.interests
    this.proficients = props.proficients
    this.title = props.title
  }
}
