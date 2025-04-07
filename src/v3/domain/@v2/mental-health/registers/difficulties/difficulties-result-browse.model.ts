export interface MentalHealthDifficultiesResultBrowseModelConstructor {
  id: number
  title: string
  name: string
  description: string
  createdAt: Date
}

export class MentalHealthDifficultiesResultBrowseModel {
  public readonly id: number
  public readonly title: string
  public readonly name: string
  public readonly description: string
  public readonly createdAt: Date

  constructor(props: MentalHealthDifficultiesResultBrowseModelConstructor) {
    this.id = props.id
    this.title = props.title
    this.name = props.name
    this.description = props.description
    this.createdAt = props.createdAt
  }
}
