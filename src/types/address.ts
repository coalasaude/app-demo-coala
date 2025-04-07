export interface Address {
  id: number
  street: string
  neighborhood: string
  complement: string
  state: string
  city: string
  number: number
  zip_code?: number
  user_id: number | null
  network_id: number | null
  created_at: Date
  updated_at: Date | null
  institution_id: number | null
}
