export interface AddressModelConstructor {
  id: number
  zipCode?: string
  street?: string
  number?: string
  complement?: string
  neighborhood?: string
  city?: string
  state?: string
}

export class AddressModel {
  public readonly id: number
  public readonly zipCode?: string
  public readonly street?: string
  public readonly number?: string
  public readonly complement?: string
  public readonly neighborhood?: string
  public readonly city?: string
  public readonly state?: string

  constructor(props: AddressModelConstructor) {
    this.id = props.id
    this.zipCode = props.zipCode
    this.street = props.street
    this.number = props.number
    this.complement = props.complement
    this.neighborhood = props.neighborhood
    this.city = props.city
    this.state = props.state
  }
}
