import { Image } from '@/types/image'
import { DefaultStatus } from '@/types/status'
import { InstitutionConfigEnum } from '@/constants/institutionConfig'
import { MEDICAL_ROLES, Role } from '@/types/role'
import { RolesDescription } from '@/constants/roles'

import { Plan } from '../Plan'
import {
  Address,
  BankAccount,
  TApiBrand,
  TApiInstitution,
  TApiNetwork,
  TApiOrganization,
} from '../api/organizations/ApiOrganizationResponse'

import { InstitutionSettings } from './InstitutionSettings'

export enum DueDateType {
  EVERY_DAY_5 = 'EVERY_DAY_5',
  EVERY_DAY_10 = 'EVERY_DAY_10',
  EVERY_DAY_15 = 'EVERY_DAY_15',
  EVERY_DAY_20 = 'EVERY_DAY_20',
  EVERY_DAY_25 = 'EVERY_DAY_25',
  EVERY_DAY_30 = 'EVERY_DAY_30',
}

export enum CostCenter {
  NETWORK = 'NETWORK',
  BRAND = 'BRAND',
  INSTITUTION = 'INSTITUTION',
}

export enum InstitutionStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  TRIAL = 'TRIAL',
}

export enum InstitutionViolationType {
  INFRINGEMENT = 'INFRINGEMENT',
  LATE_PAYMENT = 'LATE_PAYMENT',
  ALL = 'ALL',
}

export abstract class Organization {
  id: number
  fantasyName: string
  cnpj: string
  status?: DefaultStatus
  socialReason: string
  telephone: string
  email?: string
  whatsapp?: string
  imageId?: number
  image?: Image
  address?: Address
  bankAccountId?: number
  nickname?: string
  bankAccount?: BankAccount
  responsableFinance?: string
  dueDate?: DueDateType
  createdAt?: Date
  updatedAt?: Date
  costCenter: CostCenter
  usersProfileCount?: { profileName: string; count: number }[]

  constructor(params: TApiOrganization) {
    this.id = params.id
    this.nickname = params.nickname
    this.fantasyName = params.fantasyName
    this.cnpj = params.cnpj
    this.status = params.status
    this.socialReason = params.socialReason
    this.telephone = params.telephone
    this.email = params.email
    this.whatsapp = params.whatsapp
    this.imageId = params.image?.id
    this.image = params.image
    this.address = params.address
    this.bankAccountId = params.bankAccountId
    this.bankAccount = params.bankAccount
    this.responsableFinance = params.responsableFinance
    this.dueDate = params.dueDate as DueDateType
    this.costCenter = params.costCenter
    this.createdAt = params.createdAt ? new Date(params.createdAt) : undefined
    this.updatedAt = params.updatedAt ? new Date(params.updatedAt) : undefined
    this.usersProfileCount = params.usersProfileCount
  }

  getCountUserProfiles() {
    return {
      managementCount:
        this.usersProfileCount?.find((i) => i.profileName === RolesDescription[Role.MANAGER])
          ?.count || 0,
      colaboratorCount:
        this.usersProfileCount?.find((i) => i.profileName === RolesDescription[Role.COLABORATOR])
          ?.count || 0,
      studentCount:
        this.usersProfileCount?.find((i) => i.profileName === RolesDescription[Role.STUDENT])
          ?.count || 0,
      responsibleCount:
        this.usersProfileCount?.find((i) => i.profileName === RolesDescription[Role.RESPONSABLE])
          ?.count || 0,
      healthTeamCount:
        this.usersProfileCount
          ?.filter((i) =>
            MEDICAL_ROLES.map((role) => RolesDescription[role]).includes(i.profileName as Role),
          )
          .reduce((acc, curr) => acc + curr.count, 0) || 0,
    }
  }
}

export class Brand extends Organization {
  networkId?: number
  institution?: Institution[]
  network?: Network

  constructor(params: TApiBrand) {
    super(params)
    this.networkId = params.networkId
    this.institution = params.institution
      ? params.institution.map((institution) => new Institution(institution))
      : undefined
    this.network = params.network ? new Network(params.network) : undefined
  }
}

export class Network extends Organization {
  brand?: Brand[]

  constructor(params: TApiNetwork) {
    super(params)
    this.brand = params.brand ? params.brand.map((brand) => new Brand(brand)) : undefined
  }
}

export class Institution extends Organization {
  institutionSettings: InstitutionSettings[]
  institutionTypeId: number
  planId?: number
  plan?: Plan
  brandId: number
  brand?: Brand
  usersProfileCount?: { profileName: string; count: number }[]

  constructor(params: TApiInstitution) {
    super(params)
    this.institutionSettings = params.institutionSettings?.map((i) => new InstitutionSettings(i))
    this.institutionTypeId = params.institutionTypeId
    this.planId = params.planId
    this.plan = params.plan ? new Plan(params.plan) : undefined
    this.brandId = params.brandId
    this.brand = params.brand ? new Brand(params.brand) : undefined
    this.usersProfileCount = params.usersProfileCount
  }

  getConfig<T = any>(name: InstitutionConfigEnum) {
    const setting = this.institutionSettings?.find((i) => i.name === name) as InstitutionSettings<T>

    return setting
  }

  getFantasyNameWithCnpj() {
    return `${this.fantasyName} (${this.cnpj ? this.cnpj : 'CNPJ não cadastrado'})`
  }

  getFantasyName() {
    return !!this.fantasyName ? this.fantasyName : 'Coala Saúde'
  }
}
