export interface InstitutionModelConstructor {
  id: number
  fantasyName: string
  cnpj: string
}

export class InstitutionModel {
  public readonly id: number
  public readonly fantasyName: string
  public readonly cnpj: string

  constructor(props: InstitutionModelConstructor) {
    this.id = props?.id
    this.fantasyName = props?.fantasyName
    this.cnpj = props?.cnpj
  }
}
