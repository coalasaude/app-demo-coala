import { capitalizeName } from '@/utils/capitalizeName'

export type CompanyModelConstructor = {
  cnpj: string
  name?: string
  companyName: string
}

export class CompanyModel {
  cnpj: string
  _name?: string
  _companyName: string

  constructor(params: CompanyModelConstructor) {
    this.cnpj = params.cnpj
    this._name = params.name
    this._companyName = params.companyName
  }

  get name() {
    return capitalizeName(this._name)
  }

  get companyName() {
    return this._companyName
  }

  toJSON() {
    return {
      cnpj: this.cnpj,
      name: this._name,
      companyName: this._companyName,
    }
  }
}
