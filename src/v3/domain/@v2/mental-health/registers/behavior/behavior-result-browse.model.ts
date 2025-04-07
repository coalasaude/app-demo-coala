export interface MentalHealthBehaviorResultBrowseModelConstructor {
  id: number
  name: string
  trigger: string
  description: string
  createdAt: Date
}

export class MentalHealthBehaviorResultBrowseModel {
  public readonly id: number
  public readonly title: string
  public readonly trigger: string
  public readonly description: string
  public readonly createdAt: Date

  constructor(props: MentalHealthBehaviorResultBrowseModelConstructor) {
    this.id = props.id
    this.title = props.name
    this.trigger = props.trigger
    this.description = props.description
    this.createdAt = props.createdAt
  }
}
