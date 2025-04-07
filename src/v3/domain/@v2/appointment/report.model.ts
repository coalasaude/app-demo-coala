import { DefaultStatus } from '@/types/status'

import { ProfessionalModel, ProfessionalModelConstructor } from './professional.model'
import { DocumentModel, DocumentModelConstructor } from './document.model'

export interface ReportModelConstructor {
  id: number
  body: string
  title: string
  appointmentId: number
  document?: DocumentModelConstructor
  createdAt: Date
  status: DefaultStatus
  professional: ProfessionalModelConstructor
}

export class ReportModel {
  public readonly id: number
  public readonly body: string
  public readonly title: string
  public readonly appointmentId: number
  public readonly document?: DocumentModel
  public readonly createdAt: Date
  public readonly status: DefaultStatus
  public readonly professional: ProfessionalModel

  constructor(props: ReportModelConstructor) {
    this.id = props.id
    this.body = props.body
    this.appointmentId = props.appointmentId
    this.document = props.document ? new DocumentModel(props.document) : undefined
    this.createdAt = props.createdAt
    this.status = props.status
    this.title = props.title
    this.professional = new ProfessionalModel(props.professional)
  }
}
