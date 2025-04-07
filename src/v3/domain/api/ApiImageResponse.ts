import { TApiUserResponse } from './ApiUserResponse'

export interface TApiImageResponse {
  id: number
  url: string
  bucket_name: string
  filename: string
  user: TApiUserResponse
  user_id: number
  created_at: Date
  updated_at: Date
}
