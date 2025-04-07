export interface CidModelConstructor {
  id: number
  name: string
}

export class CidModel {
  public readonly id: number
  public readonly name: string

  constructor(props: CidModelConstructor) {
    this.id = props?.id
    this.name = props?.name
  }
}
