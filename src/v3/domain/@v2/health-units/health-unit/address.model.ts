export type AddressModelConstructor = {
  id?: number
  street?: string
  number?: string
  complement?: string
  neighborhood?: string
  city?: string
  state?: string
  zipCode?: string
}

export class AddressModel {
  id?: number
  street?: string
  number?: string
  private _complement?: string
  neighborhood?: string
  city?: string
  state?: string
  zipCode?: string

  constructor(params: AddressModelConstructor) {
    this.id = params.id
    this.street = params.street
    this.number = params.number
    this._complement = params.complement
    this.neighborhood = params.neighborhood
    this.city = params.city
    this.state = params.state
    this.zipCode = params.zipCode
  }

  get complement() {
    return this._complement?.split('|')[0]?.trim() || undefined
  }

  get block() {
    return this._complement?.split('|')[1]?.trim() || undefined
  }

  toJSON() {
    return {
      id: this.id,
      street: this.street,
      number: this.number,
      complement: this.complement?.trim() || undefined,
      block: this.block?.trim() || undefined,
      neighborhood: this.neighborhood,
      city: this.city,
      state: this.state,
      zipCode: this.zipCode,
    }
  }
}
