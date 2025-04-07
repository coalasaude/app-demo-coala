import { DefaultStatus } from '@/types/status'

import { ProfessionalModel } from './professional.model'
import { DocumentModel, DocumentModelConstructor } from './document.model'

type CidParamsType = {
  code: string
  codeDescription: string
}
export interface SickNoteModelConstructor {
  id: number
  body: string
  validUntil: Date
  appointmentId: number
  document?: DocumentModelConstructor
  createdAt: Date
  status: DefaultStatus
  professional: ProfessionalModel
  cid?: CidParamsType
}

export class SickNoteModel {
  public readonly id: number
  public readonly body: string
  public readonly validUntil: Date
  public readonly appointmentId: number
  public readonly document?: DocumentModel
  public readonly createdAt: Date
  public readonly status: DefaultStatus
  public readonly professional: ProfessionalModel
  public readonly cid?: CidParamsType

  constructor(props: SickNoteModelConstructor) {
    this.id = props.id
    this.validUntil = props.validUntil
    this.body = props.body
    this.appointmentId = props.appointmentId
    this.document = props.document ? new DocumentModel(props.document) : undefined
    this.createdAt = props.createdAt
    this.status = props.status

    this.professional = props.professional
    this.cid = props.cid
  }
}
