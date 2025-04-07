import { ProfessionalType } from "@/types/professionalReference"
import { DefaultStatus } from "@/types/status"

export interface TApiProfessionalReference {
  id: number
  professional_type: ProfessionalType
  name: string
  telephone: string
  email: string
  user_id: number
  status: DefaultStatus
  created_at: string
  updated_at: string | null
}
