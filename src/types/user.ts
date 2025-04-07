import { Dayjs } from 'dayjs'

import { Address } from './address'
import { Genre } from './genre'
import { Institution } from './institution'
import { Role } from './role'
import { Subscription } from './subscription'
import { UserProfile } from './userProfile'
import { HealthInsurance } from './healthInsurance'
import { ProfessionalReference } from './professionalReference'
import { Image } from './image'

export interface User {
  id: number
  cpf: string
  email: string
  name: string
  lastname: string
  telephone: string
  birthday?: string | Dayjs
  genre: Genre
  status: UserStatus | null
  userRole: UserRole[]
  password: string | null
  salt: string | null
  hasPassword?: boolean | null
  created_at: Date
  updated_at: Date | null
  institutions: Institution[]
  address: Address[]
  certificate_url: string
  valid_telephone: boolean
  valid_email: boolean
  is_health_leader: boolean
  responsable: Responsable[]
  childrens: Children[]
  Subscription: Subscription[]
  ResponsableSubscription: Subscription[]
  HealthInsurance: HealthInsurance[]
  ProfessionalReference: ProfessionalReference[]
  UserProfile: UserProfile[]
  UserImage: Image
  canUpgrade?: boolean
}

export enum UserStatus {
  FIRST_ACCESS = 'FIRST_ACCESS',
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  NO_ACCESS = 'NO_ACCESS',
  TRIAL = 'TRIAL',
}

export enum AccessType {
  WITH_PASSWORD = 'WITH_PASSWORD',
  WITHOUT_PASSWORD = 'WITHOUT_PASSWORD',
  NOT_CREATED = 'NOT_CREATED',
}

export interface UserRole {
  id: number
  user_id: number
  institution: Institution
  institution_id: number | null
  role: Role
  created_at: Date
  updated_at: Date | null
}

export interface Responsable {
  id: number
  responsable: User
  children_id: number
  children: User
  responsable_id: number
  responsable_user_role_id: number
  created_at: string
  updated_at: string | null
}

export type Children = Responsable
