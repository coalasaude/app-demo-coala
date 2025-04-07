export interface MentalHealthAreaOfInterestAcademicResultBrowseModelConstructor {
  id: number
  interestAreaId: number
  interestSubjects: { name: string }[]
  proficientSubjects: { name: string }[]
  observation?: string
  createdAt: Date
}

export class MentalHealthAreaOfInterestAcademicResultBrowseModel {
  public readonly id: number
  public readonly interestAreaId: number
  public readonly interestSubjects: { name: string }[]
  public readonly proficientSubjects: { name: string }[]
  public readonly observations?: string
  public readonly createdAt: Date

  constructor(props: MentalHealthAreaOfInterestAcademicResultBrowseModelConstructor) {
    this.id = props.id
    this.interestAreaId = props.interestAreaId
    this.interestSubjects = props.interestSubjects
    this.proficientSubjects = props.proficientSubjects
    this.observations = props.observation
    this.createdAt = props.createdAt
  }

  get interests() {
    return this.interestSubjects.map((subject) => subject.name).join(', ')
  }

  get proficients() {
    return this.proficientSubjects.map((subject) => subject.name).join(', ')
  }
}
