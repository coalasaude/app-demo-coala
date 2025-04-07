export interface VaccineModelConstructor {
  id: number
  name: string
  observation?: string
}

export class VaccineModel {
  public readonly id: number
  public readonly observation?: string
  public readonly name: string

  constructor(props: VaccineModelConstructor) {
    this.id = props?.id
    this.observation = props?.observation
    this.name = props?.name
  }
}
