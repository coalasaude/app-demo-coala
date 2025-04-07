import { Dayjs } from 'dayjs'

import { Address } from '@/types/address'
import { Genre } from '@/types/genre'
import { Institution } from '@/types/institution'
import { Children, Responsable, UserStatus } from '@/types/user'
import { UserProfile } from '@/types/userProfile'
import { capitalizeName } from '@/utils/capitalizeName'

export type TUser = Partial<{
  id: number
  cpf: string
  email: string
  name: string
  lastname: string
  social_name: string
  telephone: string
  birthday: string | Dayjs | null
  genre: Genre
  status: UserStatus | null
  password: string | null
  salt: string | null
  createdAt: Date
  updatedAt: Date | null
  institutions: Institution[]
  address: Address[]
  certificate_url: string
  valid_telephone: boolean
  valid_email: boolean
  responsable: Responsable[]
  childrens: Children[]
  UserProfile: UserProfile[]
}>

export class User {
  data: TUser = {}
  constructor(params: TUser) {
    this.data = params
  }

  getFullNameWithCpf() {
    return User.formatFullNameWithCPF(this.data.name, this.data.lastname, this.data.cpf)
  }

  getFormattedName() {
    return User.formatName(this.data.name, this.data.lastname)
  }

  static formatName(name?: string, lastname?: string) {
    if (name && lastname) {
      return `${capitalizeName(name)} ${capitalizeName(lastname)}`
    } else if (name && !lastname) {
      return capitalizeName(name)
    }

    return 'Não cadastrado'
  }

  static formatNameWithAvatar(name?: string, lastname?: string) {
    if (name && lastname) {
      return `${capitalizeName(name.replace(' ', ''))} ${capitalizeName(lastname.replace(' ', ''))}`
    } else if (name && !lastname) {
      return capitalizeName(name)
    }

    return 'Não cadastrado'
  }

  static formatFullNameWithCPF(name?: string, lastname?: string, cpf?: string) {
    if (name && lastname && cpf) {
      return `${capitalizeName(name)} ${capitalizeName(lastname)} (${cpf})`
    } else if (name && lastname && !cpf) {
      return `${capitalizeName(name)} ${capitalizeName(lastname)}`
    }

    return 'Não cadastrado'
  }
}
