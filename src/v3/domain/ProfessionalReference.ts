import { PROFESSIONAL_TYPE_DESCRIPTIONS, ProfessionalType } from '@/types/professionalReference'
import { DefaultStatus } from '@/types/status'
import { formatPhoneNumber } from '@/utils/formatPhoneNumber'

import { TApiProfessionalReference } from './api/TApiProfessionalReference'

export class ProfessionalReference {
  id: number
  professionalType: ProfessionalType
  name: string
  telephone: string
  email: string
  userId: number
  status: DefaultStatus
  createdAt: string
  updatedAt: string | null
  
  constructor(params: TApiProfessionalReference) {
    this.id = params.id
    this.professionalType = params.professional_type
    this.name = params.name
    this.telephone = params.telephone
    this.email = params.email
    this.userId = params.user_id
    this.status = params.status
    this.createdAt = params.created_at
    this.updatedAt = params.updated_at    
  }

  getFormattedPhone() {
    if (!this.telephone) return ''

    return formatPhoneNumber(this.telephone)
  }

  getProfessionalType() {
    if (!this.professionalType) return ''

    return PROFESSIONAL_TYPE_DESCRIPTIONS[this.professionalType]
  }
}
