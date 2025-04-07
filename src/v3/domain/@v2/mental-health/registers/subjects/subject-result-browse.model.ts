export interface MentalHealthSubjectResultBrowseModelConstructor {
  id: number
  name: string
}

export class MentalHealthSubjectResultBrowseModel {
  public readonly id: number
  public readonly name: string

  constructor(props: MentalHealthSubjectResultBrowseModelConstructor) {
    this.id = props.id
    this.name = props.name
  }
}
