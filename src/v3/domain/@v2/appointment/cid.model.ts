export interface CidModelConstructor {
  id: number
  name: string
  category: string
}

export class CidModel {
  public readonly id: number
  public readonly name: string
  public readonly category: string

  constructor(props: CidModelConstructor) {
    this.id = props?.id
    this.name = props?.name
    this.category = props?.category
  }
}
