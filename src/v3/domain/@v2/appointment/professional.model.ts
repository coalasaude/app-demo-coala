export interface ProfessionalModelConstructor {
  id: number
  name: string
  lastName: string
  cpf: string
  email: string
  registrationDescription?: string
  registrationNumber?: string
  profileName?: string
  isNurse: boolean
}

export class ProfessionalModel {
  public readonly id: number
  public readonly name: string
  public readonly lastName: string
  public readonly cpf: string
  public readonly email: string
  public readonly registrationDescription?: string
  public readonly registrationNumber?: string
  public readonly profileName?: string
  public readonly isNurse: boolean

  constructor(props: ProfessionalModelConstructor) {
    this.id = props.id
    this.name = props.name
    this.lastName = props.lastName
    this.cpf = props.cpf
    this.email = props.email
    this.registrationDescription = props.registrationDescription
    this.registrationNumber = props.registrationNumber
    this.profileName = props.profileName
    this.isNurse = props.isNurse
  }
}
