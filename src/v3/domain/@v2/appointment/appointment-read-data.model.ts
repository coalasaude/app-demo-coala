import dayjs from 'dayjs'

import { AppointmentFinishedStatus } from '@/constants/appointment'
import birthdayFormat from '@/utils/birthdayFormat'

import { AppointmentQueue, AppointmentStatus } from '../../Appointment'
import { MedicalRecordClassification } from '../../medical-record'

import { PatientModel, PatientModelConstructor } from './appointment-patient-read-data.model'
import { UsersInCallModelType } from './appointment-browse-data.model'

type RequestedUserModelConstructor = {
  id: number
  email: string
  cpf: string
  name: string
  lastName: string
  telephone: string
}

type AppointmentStatusLogModelConstructor = {
  createdAt: Date
  oldStatus: AppointmentStatus
  newStatus: AppointmentStatus
}

type medicalRecordStatusLogModelConstructor = {
  classification: MedicalRecordClassification
}

type InstitutionModelConstructor = {
  fantasyName: string
  id: number
  isNew: boolean
}

export interface AppointmentReadDataModelConstructor {
  id: number
  scheduledAppointmentId?: number
  closedAt: Date
  status: AppointmentStatus
  finishedReason: AppointmentFinishedStatus
  queue: AppointmentQueue
  institution?: InstitutionModelConstructor
  patient?: PatientModelConstructor
  requestedUser: RequestedUserModelConstructor
  createdAt: Date
  complaint?: string
  isAccident?: boolean
  resume: string
  roomMeetId: string
  enableNotification?: boolean
  appointmentStatusLog: AppointmentStatusLogModelConstructor[]
  medicalRecord: medicalRecordStatusLogModelConstructor
  participantJoined?: UsersInCallModelType[]
}

export class AppointmentReadDataModel {
  public readonly id: number
  public readonly scheduledAppointmentId?: number
  public readonly closedAt: Date
  public readonly isAccident?: boolean
  public readonly status: AppointmentStatus
  public readonly finishedReason: AppointmentFinishedStatus
  public readonly queue: AppointmentQueue
  public readonly patient?: PatientModel
  public readonly institution?: InstitutionModelConstructor
  public readonly requestedUser: RequestedUserModelConstructor
  public readonly createdAt: Date
  public readonly complaint?: string
  public readonly resume: string
  public readonly roomMeetId: string
  public readonly appointmentStatusLog: AppointmentStatusLogModelConstructor[]
  public readonly medicalRecord: medicalRecordStatusLogModelConstructor
  public readonly enableNotification?: boolean
  public readonly participantJoined?: UsersInCallModelType[]

  constructor(props: AppointmentReadDataModelConstructor) {
    this.id = props.id
    this.closedAt = props.closedAt
    this.scheduledAppointmentId = props.scheduledAppointmentId
    this.status = props.status
    this.finishedReason = props.finishedReason
    this.queue = props.queue
    this.institution = props.institution
    this.patient = props.patient ? new PatientModel(props.patient) : undefined
    this.requestedUser = props.requestedUser
    this.createdAt = props.createdAt
    this.complaint = props.complaint
    this.isAccident = props.isAccident
    this.resume = props.resume
    this.roomMeetId = props.roomMeetId
    this.appointmentStatusLog = props.appointmentStatusLog
    this.medicalRecord = props.medicalRecord
    this.enableNotification = props.enableNotification
    this.participantJoined = props.participantJoined
  }

  get isFinished() {
    return this.status === AppointmentStatus.FINISHED || this.status === AppointmentStatus.FOLLOW_UP
  }

  get isFinishedForEvasionOrInvalid() {
    return (
      this.finishedReason === AppointmentFinishedStatus.EVASION ||
      this.finishedReason === AppointmentFinishedStatus.INVALID
    )
  }

  get isWaitingAttendance() {
    return this.status === AppointmentStatus.WAITING_ATTENDANCE
  }

  getPatientAgeText() {
    if (!this.patient?.birthday) return ''

    const formattedBirthday = birthdayFormat(dayjs(), dayjs(this.patient.birthday))

    return formattedBirthday
  }

  getPatientFullName() {
    if (!this.patient) return ''
    return `${this.patient.name} ${this.patient.lastName}`
  }

  getComplaintText(): string {
    if (!this.complaint) return '-'

    return this.complaint
  }
}
