import { PROFESSIONAL_TYPE_DESCRIPTIONS, ProfessionalType } from '@/types/professionalReference'
import { formatPhoneNumber } from '@/utils/formatPhoneNumber'

export interface ProfessionalReferenceModelConstructor {
  id: number
  professionalType: ProfessionalType
  name: string
  telephone: string
  email?: string
}

export class ProfessionalReferenceModel {
  public readonly id: number
  public readonly professionalType: ProfessionalType
  public readonly name: string
  public readonly telephone: string
  public readonly email?: string

  constructor(params: ProfessionalReferenceModelConstructor) {
    this.id = params.id
    this.professionalType = params.professionalType
    this.name = params.name
    this.telephone = params.telephone
    this.email = params.email
  }

  getFormattedPhone() {
    return formatPhoneNumber(this.telephone)
  }

  getProfessionalType() {
    return PROFESSIONAL_TYPE_DESCRIPTIONS[this.professionalType]
  }
}
