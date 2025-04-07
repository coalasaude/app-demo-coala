import { ProfileType } from '@/types/profile'

export interface TApiProfileResponse {
  id: number
  name: string
  institution_type_id?: number
  type: ProfileType
  registration_description?: string
}
