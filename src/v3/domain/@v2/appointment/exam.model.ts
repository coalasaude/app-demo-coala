import { DefaultStatus } from '@/types/status'

import { ProfessionalModel, ProfessionalModelConstructor } from './professional.model'
import { DocumentModel, DocumentModelConstructor } from './document.model'

export interface ExamModelConstructor {
  id: number
  description: string
  recommendation: string
  validUntil: Date
  appointmentId: number
  document?: DocumentModelConstructor
  createdAt: Date
  status: DefaultStatus
  professional: ProfessionalModelConstructor
}

export class ExamModel {
  public readonly id: number
  public readonly description: string
  public readonly recommendation: string
  public readonly validUntil: Date
  public readonly appointmentId: number
  public readonly document?: DocumentModel
  public readonly createdAt: Date
  public readonly status: DefaultStatus
  public readonly professional: ProfessionalModel

  constructor(props: ExamModelConstructor) {
    this.id = props.id
    this.validUntil = props.validUntil
    this.description = props.description
    this.recommendation = props.recommendation
    this.appointmentId = props.appointmentId
    this.document = props.document ? new DocumentModel(props.document) : undefined
    this.createdAt = props.createdAt
    this.status = props.status

    this.professional = new ProfessionalModel(props.professional)
  }
}
