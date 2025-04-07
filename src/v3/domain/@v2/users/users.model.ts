import { capitalize, formatCPF } from '@brazilian-utils/brazilian-utils'
import dayjs from 'dayjs'

import { UserStatus } from '@/types/user'
import { formatPhoneNumber } from '@/utils/formatPhoneNumber'
import { Genre } from '@/types/genre'
import { ProfileType } from '@/types/profile'
import birthdayFormat from '@/utils/birthdayFormat'

import { AppFileModel } from '../@shared/app-file.model'

import { RelativeModel, RelativeModelConstructor } from './relative.model'
import { RoleModel, RoleModelConstructor } from './role/role.model'

export interface UserModelConstructor {
  id: number
  name: string
  lastName: string
  cpf?: string
  hasPassword: boolean
  validTelephone: boolean
  validEmail: boolean
  isChild: boolean
  isAdmin: boolean
  isMedical: boolean
  isResponsible: boolean
  email?: string
  socialName?: string
  birthday?: Date
  telephone?: string
  genre?: Genre
  status?: UserStatus
  isPendingCertificateUpload: boolean
  isPendingCertificatePassword: boolean
  image?: AppFileModel
  children: RelativeModelConstructor[]
  responsible: RelativeModelConstructor[]
  deniesAllergies: boolean
  hasFilledHealthHistory: boolean
  roles: RoleModelConstructor[]
}

export class UserModel {
  public readonly id: number
  public readonly name: string
  public readonly lastName: string
  public readonly cpf?: string
  public readonly validTelephone: boolean
  public readonly validEmail: boolean
  public readonly isChild: boolean
  public readonly isAdmin: boolean
  public readonly isMedical: boolean
  public readonly isResponsible: boolean
  public readonly email?: string
  public readonly socialName?: string
  public readonly birthday?: Date
  public readonly telephone?: string
  public readonly genre?: any
  public readonly status?: UserStatus
  public readonly image?: AppFileModel
  public readonly children: RelativeModel[]
  public readonly responsible: RelativeModel[]
  public readonly roles: RoleModel[]
  public readonly deniesAllergies: boolean
  public isPendingCertificateUpload: boolean
  public isPendingCertificatePassword: boolean
  public hasPassword: boolean
  public hasFilledHealthHistory: boolean

  constructor(data: UserModelConstructor) {
    this.id = data.id
    this.name = data.name
    this.lastName = data.lastName
    this.cpf = data.cpf
    this.email = data.email
    this.socialName = data.socialName
    this.birthday = data.birthday
    this.telephone = data.telephone
    this.genre = data.genre
    this.status = data.status
    this.hasPassword = data.hasPassword
    this.validTelephone = data.validTelephone
    this.validEmail = data.validEmail

    this.image = data.image ? new AppFileModel(data.image) : undefined
    this.children = data.children.map((e) => new RelativeModel(e))
    this.responsible = data.responsible.map((e) => new RelativeModel(e))
    this.roles = data.roles.map((e) => new RoleModel(e))

    this.isChild = data.isChild
    this.isAdmin = data.isAdmin
    this.isMedical = data.isMedical
    this.isResponsible = data.isResponsible
    this.isPendingCertificateUpload = data.isPendingCertificateUpload
    this.isPendingCertificatePassword = data.isPendingCertificatePassword
    this.deniesAllergies = data.deniesAllergies
    this.hasFilledHealthHistory = data.hasFilledHealthHistory
  }

  get isHealthLeader(): boolean {
    return !!this.roles?.some((role) => role.isHealthLeader)
  }

  get isManager(): boolean {
    return !!this.roles?.some((role) => role.profile.name.includes('Gestor'))
  }

  get isCollaborator(): boolean {
    return !!this.roles?.some((role) => role.profile.name.includes('Colaborador'))
  }

  getPassword() {
    return this.hasPassword ? '******' : '-'
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
    if (!this.telephone) return '-'

    return formatPhoneNumber(this.telephone)
  }

  getFormattedCPF() {
    if (this.cpf) {
      return formatCPF(this.cpf, { pad: true })
    }
    return '-'
  }

  getFormattedBirthday() {
    if (this.birthday) return dayjs(this.birthday).format('DD/MM/YYYY')

    return ''
  }

  getGenreArticle() {
    if (this.genre === Genre.Masculino) {
      return 'o'
    } else if (this.genre === Genre.Feminino) {
      return 'a'
    }

    return 'e'
  }

  findResponsible(responsibleId?: number): RelativeModel | null {
    if (!responsibleId) return null
    return this.responsible?.find((e) => e.id === responsibleId) || null
  }

  isInstitutionalMedical(institutionId: number) {
    return this.roles.some(
      (role) =>
        role?.institution?.id === institutionId && role.profile.type === ProfileType.MEDICAL,
    )
  }

  isFacultativeAccess() {
    return this.roles.some((role) => role.profile.type === ProfileType.FACULTATIVE_ACCESS)
  }

  getAge() {
    if (!this.birthday) return ''

    const formattedBirthday = birthdayFormat(dayjs(), dayjs(this.birthday))

    return formattedBirthday
  }

  getFormattedGenderAndAge() {
    if (this.genre && this.birthday) {
      return `${this.genre} - ${this.getAge()}`
    } else if (this.genre && !this.birthday) {
      return `${this.genre}`
    } else if (!this.genre && this.birthday) {
      return `${this.getAge()}`
    }

    return ''
  }

  getProfileNames() {
    const roles = new Set<string>()
    this.roles.forEach((role) => roles.add(role.profile.name))
    if (this.isResponsible) roles.add('Responsável')

    return Array.from(roles)
  }

  hasProfileType(profileType: ProfileType): boolean {
    return this.roles?.some((e) => e?.profile?.type === profileType) || false
  }

  hasResponsible() {
    const hasResponsible = this.responsible?.some((e) => e?.id)

    return hasResponsible
  }

  hasRolesFromInstitution(institutionId: number) {
    return this.roles.some((role) => role.institution?.id === institutionId)
  }

  getInstitutionsIdsStr() {
    const uniqueInstitutionIds = Array.from(
      new Set(
        this.roles
          .map((role) => role?.institution?.id)
          .filter((id): id is number => id !== undefined),
      ),
    ).join(',')
    return uniqueInstitutionIds
  }

  getInstitutionsIds() {
    const uniqueInstitutionIds = Array.from(
      new Set(
        this.roles
          .map((role) => role?.institution?.id)
          .filter((id): id is number => id !== undefined),
      ),
    )
    return uniqueInstitutionIds
  }

  isFromForumTestersInstitution() {
    const isTesterInstitution = this.getInstitutionsIds().some((id) =>
      process.env.NEXT_PUBLIC_INSTITUTIONS_IDS_FORUM_TESTERS?.split(',').includes(String(id)),
    )
    return !!isTesterInstitution
  }

  isOnlyResponsible() {
    return this.isResponsible && this.roles.length === 0
  }

  isResponsibleForChild(childId: number) {
    return this.children.some((child) => child.id === childId)
  }
}
