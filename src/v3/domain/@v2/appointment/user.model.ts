import { formatCPF } from '@brazilian-utils/brazilian-utils'

export interface UserModelConstructor {
  id: number
  name: string
  lastName: string
  cpf: string
}

export class UserModel {
  public readonly id: number
  public readonly name: string
  public readonly lastName: string
  public readonly cpf: string

  constructor(data: UserModelConstructor) {
    this.id = data.id
    this.name = data.name
    this.lastName = data.lastName
    this.cpf = data.cpf
  }

  get fullNameWithCPF() {
    const cpf = this.cpf ? `(${formatCPF(this.cpf)})` : ''
    return `${this.name} ${this.lastName} ${cpf}`
  }
}
