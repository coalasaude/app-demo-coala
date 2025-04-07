export type CompanyPositionModelConstructor = {
  id: number
  name: string
}

export class CompanyPositionModel {
  public readonly id: number
  public readonly name: string

  constructor(params: CompanyPositionModelConstructor) {
    this.id = params.id
    this.name = params.name
  }
}
