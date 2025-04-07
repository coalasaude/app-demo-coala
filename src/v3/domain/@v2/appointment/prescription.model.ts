import { PrescriptionType } from '@/types/records'
import { DefaultStatus } from '@/types/status'

import { ProfessionalModel, ProfessionalModelConstructor } from './professional.model'
import { MedicineModel, MedicineModelConstructor } from './medicine.model'
import { DocumentModel, DocumentModelConstructor } from './document.model'

export interface PrescriptionModelConstructor {
  id: number
  validUntil: Date
  status: DefaultStatus
  appointmentId: number
  document?: DocumentModelConstructor
  professional: ProfessionalModelConstructor
  type: PrescriptionType
  medicines: MedicineModelConstructor[]
}

export class PrescriptionModel {
  public readonly id: number
  public readonly validUntil: Date
  public readonly status: DefaultStatus
  public readonly appointmentId: number
  public readonly document?: DocumentModel
  public readonly professional: ProfessionalModel
  public readonly type: PrescriptionType
  public readonly medicines: MedicineModel[]

  constructor(props: PrescriptionModelConstructor) {
    this.id = props.id
    this.validUntil = props.validUntil
    this.status = props.status
    this.document = props.document ? new DocumentModel(props.document) : undefined
    this.appointmentId = props.appointmentId
    this.type = props.type

    this.professional = new ProfessionalModel(props.professional)
    this.medicines = props.medicines.map((medicine) => new MedicineModel(medicine))
  }
}
