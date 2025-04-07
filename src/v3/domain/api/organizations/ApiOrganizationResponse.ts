import { Image } from '@/types/image'
import { DefaultStatus } from '@/types/status'

import { CostCenter } from '../../organizations/Organization'

import { TApiInstitutionSettings } from './ApiInstitutionSettings'
import { TApiPlanResponse } from './ApiPlanResponse'

export interface Pagination {
  total: number
  limit: number
  offset: number
}

export interface Address {
  zipCode: string
  city: string
  state: string
  street: string
  number: string
  complement: string
  block: string
  neighborhood: string
}

export interface BankAccount {
  account: string
  agency: string
  bank: string
  pixKey: string
}

export interface TApiOrganization {
  id: number
  nickname: string
  fantasyName: string
  socialReason: string
  cnpj: string
  status: DefaultStatus
  email: string
  telephone: string
  whatsapp: string
  imageId: number
  image: Image
  address: Address
  responsableFinance: string
  dueDate: string
  costCenter: CostCenter
  bankAccount: BankAccount
  bankAccountId: number
  usersProfileCount?: { profileName: string; count: number }[]
  createdAt: string
  updatedAt: string
}

export type TApiNetwork = TApiOrganization & {
  brand: TApiBrand[]
}

export type TApiBrand = TApiOrganization & {
  network: TApiNetwork
  networkId: number
  institution: TApiInstitution[]
}

export type TApiInstitution = TApiOrganization & {
  brand: TApiBrand
  brandId: number
  institutionSettings: TApiInstitutionSettings[]
  institutionTypeId: number
  planId?: number
  plan?: TApiPlanResponse
}

export interface TApiListBrands {
  pagination: Pagination
  results: TApiBrand[]
}

export interface TApiListNetworks {
  pagination: Pagination
  results: TApiNetwork[]
}

export interface TApiListInstitutions {
  count: number
  results: TApiInstitution[]
}
