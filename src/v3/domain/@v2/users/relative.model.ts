import { capitalize } from '@brazilian-utils/brazilian-utils'
import dayjs from 'dayjs'

import { ProfessionalType } from '@/types/professionalReference'
import { UserStatus } from '@/types/user'
import { formatPhoneNumber } from '@/utils/formatPhoneNumber'
import { Genre } from '@/types/genre'

import { AppFileModel } from '../@shared/app-file.model'

import { RoleModel, RoleModelConstructor } from './role/role.model'

export interface RelativeModelConstructor {
  id: number
  professionalType: ProfessionalType
  name: string
  lastName: string
  socialName?: string
  telephone: string
  email?: string
  birthday?: Date
  genre: Genre
  status: UserStatus
  roles: RoleModelConstructor[]
  image?: AppFileModel
}

export class RelativeModel {
  public readonly id?: number
  public readonly name: string
  public readonly lastName: string
  public readonly socialName?: string
  public readonly email?: string
  public readonly telephone?: string
  public readonly status: UserStatus
  public readonly birthday?: Date
  public readonly genre?: Genre
  public readonly roles: RoleModel[]
  public readonly image?: AppFileModel

  constructor(data: RelativeModelConstructor) {
    this.id = data.id
    this.name = data.name
    this.lastName = data.lastName
    this.email = data.email
    this.telephone = data.telephone
    this.socialName = data.socialName
    this.status = data.status
    this.birthday = data.birthday
    this.genre = data.genre
    this.roles = data.roles.map((e) => new RoleModel(e))
    this.image = data.image ? new AppFileModel(data.image) : undefined
  }

  getFullName() {
    if (this.socialName) {
      return this.socialName
    }

    if (this.name || this.lastName) {
      return capitalize(`${this.name || ''} ${this.lastName}` || '').trim()
    }

    return 'Não cadastrado'
  }

  getFormattedPhone() {
    if (!this.telephone) return ''

    return formatPhoneNumber(this.telephone)
  }

  getFormattedBirthday() {
    if (this.birthday) return dayjs(this.birthday).format('DD/MM/YYYY')

    return ''
  }

  getAge() {
    const date = dayjs(this.birthday)
    const today = dayjs()
    return today.diff(date, 'years')
  }

  getFormattedGenderAndAge() {
    if (this.genre && this.birthday) {
      return `${this.genre} - ${this.getAge()} anos`
    } else if (this.genre && !this.birthday) {
      return `${this.genre}`
    } else if (!this.genre && this.birthday) {
      return `${this.getAge()} anos`
    }

    return ''
  }

  getInstitutionNames() {
    return this.roles.map((role) => role.institution?.fantasyName).join(', ')
  }
}
