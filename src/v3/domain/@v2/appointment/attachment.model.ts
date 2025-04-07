import { DefaultStatus } from '@/types/status'

import { ProfessionalModel, ProfessionalModelConstructor } from './professional.model'
import { DocumentModel, DocumentModelConstructor } from './document.model'

export interface AttachmentModelConstructor {
  id: number
  title: string
  status: DefaultStatus
  appointmentId: number
  document?: DocumentModelConstructor
  user: ProfessionalModelConstructor
}

export class AttachmentModel {
  public readonly id: number
  public readonly title: string
  public readonly status: DefaultStatus
  public readonly appointmentId: number
  public readonly document?: DocumentModel
  public readonly user: ProfessionalModel

  constructor(props: AttachmentModelConstructor) {
    this.id = props.id
    this.title = props.title
    this.status = props.status
    this.document = props.document ? new DocumentModel(props.document) : undefined
    this.appointmentId = props.appointmentId
    this.user = new ProfessionalModel(props.user)
  }
}
