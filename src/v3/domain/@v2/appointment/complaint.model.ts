export interface ComplaintModelConstructor {
  id: number
  name: string
}

export class ComplaintModel {
  public readonly id: number
  public readonly name: string

  constructor(props: ComplaintModelConstructor) {
    this.id = props?.id
    this.name = props?.name
  }
}
