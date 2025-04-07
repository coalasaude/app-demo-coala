export interface MentalHealthDifficultiesReadModelConstructor {
  id: number
  title: string
  name: string
  description: string
}

export class MentalHealthDifficultiesReadModel {
  public readonly id: number
  public readonly title: string
  public readonly name: string
  public readonly description: string

  constructor(props: MentalHealthDifficultiesReadModelConstructor) {
    this.id = props.id
    this.title = props.title
    this.name = props.name
    this.description = props.description
  }
}
