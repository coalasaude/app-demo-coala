import { AppFileModel } from '../../../@shared/app-file.model'
import { MedicalRegistrationEnum } from '../../enums/medical-registration.enum'

export interface MentalHealthMedicalAnalysisResultBrowseModelConstructor {
  id: number
  analysis: string
  isEditable: boolean
  status: string
  createdUser: {
    name: string
    lastname: string
    registration: string
    registrationType: MedicalRegistrationEnum
  }
  createdAt: Date
  document: AppFileModel | null
}

export class MentalHealthMedicalAnalysisResultBrowseModel {
  public readonly id: number
  public readonly analysis: string
  public readonly isEditable: boolean
  public readonly isInvalid: boolean
  public readonly analyzedBy: {
    readonly name: string
    readonly registration: string
    readonly registrationType: MedicalRegistrationEnum
  }
  public readonly emissionDate: Date
  public readonly document: AppFileModel | null

  constructor(props: MentalHealthMedicalAnalysisResultBrowseModelConstructor) {
    this.id = props.id
    this.analysis = props.analysis
    this.isEditable = props.isEditable

    this.isInvalid = props.status === 'INACTIVE'
    this.analyzedBy = {
      name: props.createdUser.name + ' ' + props.createdUser.lastname,
      registration: props.createdUser.registration,
      registrationType: props.createdUser.registrationType,
    }
    this.emissionDate = props.createdAt

    this.document = props.document ? new AppFileModel(props.document) : null
  }
}
