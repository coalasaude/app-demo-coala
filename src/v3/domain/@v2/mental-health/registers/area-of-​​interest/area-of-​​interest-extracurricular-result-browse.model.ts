export interface MentalHealthAreaOfInterestExtracurricularResultBrowseModelConstructor {
  id: number
  interestAreaId: number
  interests: string
  proficients?: string
  observation?: string
  createdAt: Date
}

export class MentalHealthAreaOfInterestExtracurricularResultBrowseModel {
  public readonly id: number
  public readonly interests: string
  public readonly interestAreaId: number
  public readonly proficients?: string
  public readonly observations?: string
  public readonly createdAt: Date

  constructor(props: MentalHealthAreaOfInterestExtracurricularResultBrowseModelConstructor) {
    this.id = props.id
    this.interests = props.interests
    this.proficients = props.proficients
    this.interestAreaId = props.interestAreaId
    this.observations = props.observation
    this.createdAt = props.createdAt
  }
}
