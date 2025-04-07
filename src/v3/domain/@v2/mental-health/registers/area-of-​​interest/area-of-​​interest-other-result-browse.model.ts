export interface MentalHealthAreaOfInterestOtherResultBrowseModelConstructor {
  id: number
  title: string
  interestAreaId: number
  observation?: string
  createdAt: Date
}

export class MentalHealthAreaOfInterestOtherResultBrowseModel {
  public readonly id: number
  public readonly title: string
  public readonly interestAreaId: number
  public readonly observations?: string
  public readonly createdAt: Date

  constructor(props: MentalHealthAreaOfInterestOtherResultBrowseModelConstructor) {
    this.id = props.id
    this.title = props.title
    this.interestAreaId = props.interestAreaId
    this.observations = props.observation
    this.createdAt = props.createdAt
  }
}
