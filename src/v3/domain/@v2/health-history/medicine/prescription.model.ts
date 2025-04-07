import { AppFileModel } from '../../@shared/app-file.model'

export interface PrescriptionModelConstructor {
  id: number
  document?: AppFileModel
  isFromAppointment?: boolean
}

export class PrescriptionModel {
  public readonly id: number
  public readonly isFromAppointment?: boolean
  public readonly document?: AppFileModel

  constructor(props: PrescriptionModelConstructor) {
    this.id = props.id
    this.isFromAppointment = props.isFromAppointment
    this.document = props.document ? new AppFileModel(props.document) : undefined
  }
}
