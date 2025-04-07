import { User } from './user'

export interface Image {
  id: number
  user_id: number
  user: User
  url: string
  bucket_name: string
  filename: string
  created_at: Date
  updated_at: Date
}
