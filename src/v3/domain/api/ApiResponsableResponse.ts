import { TApiUserResponse } from './ApiUserResponse'

export interface TApiResponsableResponse {
  id: number
  responsable: TApiUserResponse
  children_id: number
  children: TApiUserResponse
  responsable_id: number
  responsable_user_role_id: number
  created_at: string
  updated_at: string | null
}
