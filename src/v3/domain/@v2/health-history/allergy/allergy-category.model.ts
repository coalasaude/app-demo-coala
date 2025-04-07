export interface AllergyCategoryModelConstructor {
  id: number
  name: string
}

export class AllergyCategoryModel {
  public readonly id: number
  public readonly name: string

  constructor(props: AllergyCategoryModelConstructor) {
    this.id = props?.id
    this.name = props?.name
  }
}
