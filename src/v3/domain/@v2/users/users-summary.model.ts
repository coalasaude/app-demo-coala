import { capitalize, formatCPF } from '@brazilian-utils/brazilian-utils'

import { UserStatus } from '@/types/user'

import { AppFileModel } from '../@shared/app-file.model'

import { RelativeModel } from './relative.model'

export interface UserSummaryModelConstructor {
  id: number
  name: string
  lastName: string
  socialName: string
  status: UserStatus
  cpf: string
  children: RelativeModel[]
  responsible: RelativeModel[]
  image: AppFileModel
  roles: {
    id: number
    profile: {
      id: number
      name: string
    }
    isHealthLeader?: boolean
    institutionId?: number
    networkId?: number
    brandId?: number
    institutionName?: string
  }[]
}

export class UserSummaryModel {
  readonly id: number
  readonly name: string
  readonly lastName: string
  readonly socialName: string
  readonly status: UserStatus
  readonly cpf: string
  readonly children: RelativeModel[]
  readonly responsible: RelativeModel[]
  readonly image: AppFileModel
  readonly roles: {
    readonly id: number
    readonly profile: { id: number; name: string }
    readonly isHealthLeader?: boolean
    readonly institutionId?: number
    readonly networkId?: number
    readonly brandId?: number
    readonly institutionName?: string
  }[]

  constructor(params: UserSummaryModelConstructor) {
    this.id = params.id
    this.name = params.name
    this.lastName = params.lastName
    this.socialName = params.socialName
    this.status = params.status
    this.cpf = params.cpf
    this.children = params.children
    this.responsible = params.responsible
    this.image = params.image
    this.roles = params.roles.map((role) => ({
      id: role.id,
      profile: {
        id: role.profile.id,
        name: role.profile.name,
      },
      isHealthLeader: role.isHealthLeader,
      institutionId: role.institutionId,
      networkId: role.networkId,
      brandId: role.brandId,
      institutionName: role.institutionName,
    }))
  }

  getStatusFormatted() {
    if (this.status === UserStatus.ACTIVE)
      return {
        label: 'Ativo',
        circleColor: '--mui-palette-success-main',
        bgColor: '--mui-palette-success-light',
      }
    if (this.status === UserStatus.INACTIVE)
      return {
        label: 'Inativo',
        circleColor: '--mui-palette-error-main',
        bgColor: '--mui-palette-error-light',
      }
    if (this.status === UserStatus.FIRST_ACCESS)
      return {
        label: 'Pendente',
        circleColor: '--mui-palette-warning-main',
        bgColor: '--mui-palette-warning-light',
      }
    if (this.status === UserStatus.NO_ACCESS)
      return {
        label: 'Sem acesso',
        circleColor: '--mui-palette-grey-400',
        bgColor: '--mui-palette-grey-100',
      }
    if (this.status === UserStatus.TRIAL)
      return {
        label: 'Teste gratuito',
        circleColor: '--mui-palette-primary-main',
        bgColor: '--mui-palette-primary-light',
      }

    return { label: '', circleColor: '--mui-palette-grey-400', bgColor: '--mui-palette-grey-100' }
  }

  getNumResponsibleText() {
    if (this.responsible?.length) {
      if (this.responsible.length == 1) return `1 responsável`
      return `${this.responsible.length} responsáveis`
    }
    return ''
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

  getProfilesText() {
    const profiles = this.roles
      ?.map((role) => role?.profile?.name)
      .filter((name) => !!name)
      .filter((name, index, self) => self.indexOf(name) === index)

    if (this.children?.length) {
      profiles?.push('Responsável')
    }

    return profiles?.length ? profiles.join(' / ') : 'Sem perfis'
  }

  getRolesIds() {
    return this.roles.map((role) => role.id)
  }

  hasRolesFromInstitution(institutionId: number) {
    return this.roles.some((role) => role.institutionId === institutionId)
  }

  get fullNameWithCPF() {
    const cpf = this.cpf ? `(${formatCPF(this.cpf)})` : ''
    return `${this.name} ${this.lastName} ${cpf}`
  }

  hasHealthLeaderProfile() {
    return this.roles.some((role) => role.isHealthLeader)
  }

  getInstitutionsByBrandId(brandId: number) {
    return this.roles.filter((role) => role.brandId === brandId)
  }

  getInstitutionsByNetworkId(networkId: number) {
    return this.roles.filter((role) => role.networkId === networkId)
  }
}
