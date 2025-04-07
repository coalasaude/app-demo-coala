export interface InstitutionModelConstructor {
  id: number
  fantasyName?: string
  cnpj?: string
  networkId?: number
}

export class InstitutionModel {
  public readonly id: number
  public readonly cnpj?: string
  public readonly fantasyName?: string
  public readonly networkId?: number

  constructor(data: InstitutionModelConstructor) {
    this.id = data.id
    this.cnpj = data.cnpj
    this.fantasyName = data.fantasyName
    this.networkId = data.networkId
  }

  getFantasyName() {
    return !!this.fantasyName ? this.fantasyName : 'Coala Saúde'
  }
}
