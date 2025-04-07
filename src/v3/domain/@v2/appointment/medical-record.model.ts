import { MedicalRecordClassification } from '@/types/medicalRecord'
import { DefaultStatus } from '@/types/status'

import { ProfessionalModel, ProfessionalModelConstructor } from './professional.model'
import { DocumentModel, DocumentModelConstructor } from './document.model'

export interface MedicalRecordModelConstructor {
  id: number
  classification: MedicalRecordClassification
  history: string
  impression: string
  conduct: string
  exam?: string
  systolic?: number
  diastolic?: number
  heartRate?: number
  respiratoryFrequency?: number
  bodyTemperature?: number
  oxygenSaturation?: number
  appointmentId: number
  document?: DocumentModelConstructor
  createdAt: Date
  status: DefaultStatus
  professional: ProfessionalModelConstructor
}

export class MedicalRecordModel {
  public readonly id: number
  public readonly classification: MedicalRecordClassification
  public readonly history: string
  public readonly impression: string
  public readonly conduct: string
  public readonly exam?: string
  public readonly systolic?: number
  public readonly diastolic?: number
  public readonly heartRate?: number
  public readonly respiratoryFrequency?: number
  public readonly bodyTemperature?: number
  public readonly oxygenSaturation?: number
  public readonly appointmentId: number
  public readonly document?: DocumentModel
  public readonly createdAt: Date
  public readonly status: DefaultStatus
  public readonly professional: ProfessionalModel

  constructor(props: MedicalRecordModelConstructor) {
    this.id = props.id
    this.classification = props.classification
    this.history = props.history
    this.impression = props.impression
    this.conduct = props.conduct
    this.exam = props.exam
    this.systolic = props.systolic
    this.diastolic = props.diastolic
    this.heartRate = props.heartRate
    this.respiratoryFrequency = props.respiratoryFrequency
    this.bodyTemperature = props.bodyTemperature
    this.oxygenSaturation = props.oxygenSaturation
    this.appointmentId = props.appointmentId
    this.document = props.document ? new DocumentModel(props.document) : undefined
    this.createdAt = props.createdAt
    this.status = props.status

    this.professional = new ProfessionalModel(props.professional)
  }

  public get bloodPressure() {
    return this.systolic && this.diastolic !== 0 ? `${this.systolic}x${this.diastolic}` : '-'
  }
}
