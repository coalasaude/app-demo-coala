import { AppFileModel } from '../../../@shared/app-file.model'
import { MedicalRegistrationEnum } from '../../enums/medical-registration.enum'

export interface MentalHealthMedicalReportModelConstructor {
  id: number
  documentName: string
  professionalName: string
  registration: string
  registrationType: MedicalRegistrationEnum
  emissionDate: Date
  document: AppFileModel
}

export class MentalHealthMedicalReportModel {
  public readonly id: number
  public readonly documentName: string
  public readonly professionalName: string
  public readonly medicalRegistration: string
  public readonly medicalRegistrationType: MedicalRegistrationEnum
  public readonly emissionDate: Date
  public readonly document: AppFileModel

  constructor(props: MentalHealthMedicalReportModelConstructor) {
    this.id = props.id
    this.documentName = props.documentName
    this.professionalName = props.professionalName
    this.medicalRegistration = props.registration
    this.medicalRegistrationType = props.registrationType
    this.emissionDate = props.emissionDate
    this.document = new AppFileModel(props.document)
  }
}
