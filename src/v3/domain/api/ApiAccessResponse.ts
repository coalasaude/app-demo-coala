import { TApiInstitutionResponse } from './ApiInstitutionResponse'
import { TApiUserResponse } from './ApiUserResponse'

export interface TApiAccessResponse {
  dependents: TApiUserResponse[]
  institutions: TApiInstitutionResponse[]
  self_access: boolean
  is_admin: boolean
  profilesNames: Record<number, string[]>
}
