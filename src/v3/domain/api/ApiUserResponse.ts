import { Address } from '@/types/address'
import { Genre } from '@/types/genre'
import { Institution } from '@/types/institution'
import { UserStatus } from '@/types/user'

import { TUserProfile } from '../UserProfile'

import { TApiGeneralInformation } from './ApiGeneralInformation'
import { TApiImageResponse } from './ApiImageResponse'
import { TApiMeasureBodyMassIndex } from './ApiMeasureBodyMassIndex'
import { TApiResponsableResponse } from './ApiResponsableResponse'
import { TApiSubscriptionResponse } from './ApiSubscriptionResponse'
import { TApiHealthInsurance } from './TApiHealthInsurance'
import { TApiProfessionalReference } from './TApiProfessionalReference'

export interface TApiUserResponse {
  id: number
  cpf: string | null
  email: string | null
  name: string | null
  lastname: string | null
  lastName: string | null
  socialName?: string
  telephone: string | null
  birthday: string | null
  genre: Genre | null
  validTelephone?: boolean
  validEmail?: boolean
  status: UserStatus
  createdAt: Date
  updatedAt: Date
  institutions?: Institution[]
  address?: Address[]
  certificate_url?: string | null
  hasPassword?: boolean
  responsible?: TApiResponsableResponse[]
  childrens?: TApiResponsableResponse[]
  userProfile: TUserProfile[]
  userImage: TApiImageResponse | null
  subscription?: TApiSubscriptionResponse[]
  generalInformation?: TApiGeneralInformation
  measureBodyMassIndex?: TApiMeasureBodyMassIndex[]
  HealthInsurance?: TApiHealthInsurance[]
  ProfessionalReference?: TApiProfessionalReference[]
  url?: string

  social_name: string | null
  valid_telephone: boolean | null
  valid_email: boolean | null
  responsable?: TApiResponsableResponse[]
  UserProfile: TUserProfile[]
  Subscription?: TApiSubscriptionResponse[]
  UserImage: TApiImageResponse | null
  GeneralInformation?: TApiGeneralInformation
  MeasureBodyMassIndex?: TApiMeasureBodyMassIndex[]
}

export interface TApiUserListResponse {
  count: number
  results: TApiUserResponse[]
  filters: { profiles: { value: number; label: string }[] }
}
