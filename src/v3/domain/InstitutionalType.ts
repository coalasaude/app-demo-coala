export class InstitutionalType {
  id: number
  private _name: string

  constructor(params: { id: number; name: string }) {
    this.id = params.id
    this._name = params.name
  }

  get name() {
    return this._name || '-'
  }
}
