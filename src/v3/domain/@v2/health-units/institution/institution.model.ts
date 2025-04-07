export type InstitutionModelConstructor = {
  id: number
  name: string
}

export class InstitutionModel {
  id: number
  private _name: string

  constructor({ id, name }: InstitutionModelConstructor) {
    this.id = id
    this._name = name
  }

  get name() {
    return this._name || 'Nome não cadastrado'
  }
}
