import { UserStatus } from '@/types/user'
import { ProfileType } from '@/types/profile'

import { IFormResponsibleDataFields } from '../../components/FormResponsible/schema'

export interface BaseUserAddStepProps {
  onSetData?: (data: IUserCreationDataState) => void
}

export interface IUserCreationDependenceState {
  id: number
  name: string
  lastname: string
  status?: UserStatus
  url?: string
}
export interface IUserCreationDataState {
  institutionId?: number | null
  profileId?: number
  profile?: { id?: number; name?: string; type?: ProfileType }
  responsible?: IFormResponsibleDataFields[] | null
  dependents?: IUserCreationDependenceState[]
}
export interface IUserFormData {
  name?: string
  lastname?: string
  email?: string
  phone?: string
  registerCode?: string
  dependentsIds?: number[]
}
