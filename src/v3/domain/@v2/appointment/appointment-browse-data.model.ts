import { AppointmentFinishedStatus } from '@/constants/appointment'
import { MEDICAL_RECORD_CLASSIFICATION_DESCRIPTION } from '@/constants/medicalRecordClassification'
import { getPillColor } from '@/v3/presentation/pages/appointment/Emergency/utils/getPillColor'
import { formatDate } from '@/utils/formatDate'

import { AppointmentQueue, AppointmentStatus } from '../../Appointment'
import { MedicalRecordClassification } from '../../medical-record'

export type PatientModelType = {
  id: number
  fullName: string
  imageUrl?: string
  socialName: string
  birthday: Date
  responsable: ResponsibleModelType[]
  profileName: string
}

type IsClassificationByAiType = { canManageAppointment: boolean }

type ResponsibleModelType = {
  id: number
}

type InstitutionModelType = {
  id: number
  fantasyName: string
  isNew: boolean
}

type MedicalRecordModelType = {
  classification: MedicalRecordClassification
}

type RequestedUserModelType = {
  id: number
  name: string
  lastName: string
  socialName: string
  status: string
}

export type UsersInCallModelType = {
  id: number
  fullName: string
  profileName?: string
  imageUrl?: string
}

export type AppointmentBrowseDataModelConstructor = {
  id: number
  patient?: PatientModelType
  requestedUser: RequestedUserModelType
  classificationByAi: string
  complaint?: string
  queue?: AppointmentQueue
  resume: string
  createdAt: Date
  roomMeetId?: string
  status: AppointmentStatus
  finishedReason?: AppointmentFinishedStatus
  institution: InstitutionModelType
  closedAt?: Date
  medicalRecord: MedicalRecordModelType
  usersInCall?: UsersInCallModelType[]
}

export class AppointmentBrowseDataModel {
  public readonly id: number
  public readonly patient?: PatientModelType
  public readonly requestedUser: RequestedUserModelType
  public readonly classificationByAi: string
  public readonly complaint?: string
  public readonly queue?: AppointmentQueue
  public readonly resume: string
  public readonly createdAt: Date
  public readonly roomMeetId?: string
  public readonly status: AppointmentStatus
  public readonly finishedReason?: AppointmentFinishedStatus
  public readonly institution: InstitutionModelType
  public readonly closedAt?: Date
  public readonly medicalRecord?: MedicalRecordModelType
  public readonly usersInCall: UsersInCallModelType[]

  constructor(props: AppointmentBrowseDataModelConstructor) {
    this.id = props.id
    this.patient = props.patient
    this.requestedUser = props.requestedUser
    this.classificationByAi = props.classificationByAi
    this.complaint = props.complaint
    this.queue = props.queue
    this.createdAt = props.createdAt
    this.resume = props.resume
    this.roomMeetId = props.roomMeetId
    this.status = props.status
    this.finishedReason = props.finishedReason
    this.institution = props.institution
    this.closedAt = props.closedAt
    this.medicalRecord = props.medicalRecord
    this.usersInCall = props.usersInCall || []
  }

  get isFinishedRow() {
    return this.status === AppointmentStatus.FINISHED || this.status === AppointmentStatus.FOLLOW_UP
  }

  get classification() {
    return this.medicalRecord?.classification
      ? MEDICAL_RECORD_CLASSIFICATION_DESCRIPTION[this.medicalRecord.classification]
      : 'Sem classificação'
  }

  isClassificationByAi({ canManageAppointment }: IsClassificationByAiType) {
    return (
      this.classification === 'Sem classificação' && this.classificationByAi && canManageAppointment
    )
  }

  getClassificationTitle({ canManageAppointment }: IsClassificationByAiType) {
    return this.isClassificationByAi({ canManageAppointment })
      ? MEDICAL_RECORD_CLASSIFICATION_DESCRIPTION[this.classificationByAi]
      : this.classification
  }

  getClassificationColor({ canManageAppointment }: IsClassificationByAiType) {
    const color = getPillColor(this.medicalRecord?.classification)
    const classificationColor = this.isClassificationByAi({ canManageAppointment })
      ? getPillColor(this.classificationByAi as MedicalRecordClassification)
      : color

    return classificationColor
  }


  getCreatedAtDate() {
    return formatDate(String(this.createdAt), 'DD/MM/YYYY')
  }

  getClosedAtDate() {
    return formatDate(String(this.closedAt), 'DD/MM/YYYY')
  }

}
