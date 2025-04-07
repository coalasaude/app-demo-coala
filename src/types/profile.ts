import { InstitutionalType } from './institution'

export interface Profile {
  id: number
  type: ProfileType
  name: string
  institution_type_id: number
  ProfilePermission: ProfilePermission[]
  InstitutionalType: InstitutionalType
  registration_description?: string
}

export interface ProfilePermission {
  id: number
  permission_id: number
  profile_id: number
}
export enum ProfileType {
  MEDICAL = 'MEDICAL',
  NORMAL = 'NORMAL',
  FACULTATIVE_ACCESS = 'FACULTATIVE_ACCESS',
}
