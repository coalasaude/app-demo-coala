export interface AllergySymptomModelConstructor {
  id: number
  name: string
}

export class AllergySymptomModel {
  public readonly id: number
  public readonly name: string

  constructor(props: AllergySymptomModelConstructor) {
    this.id = props?.id
    this.name = props?.name
  }
}
