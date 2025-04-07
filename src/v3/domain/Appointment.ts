import { Complaint } from '@/types/complaint'
import { ComplaintDescription } from '@/constants/complaint'
import { AppointmentStatusDescription } from '@/constants/status'
import { formatDate } from '@/utils/formatDate'
import { AppointmentFinishedStatus } from '@/constants/appointment'

import { AppointmentFeedback, TApiAppointmentFeedbackResponse } from './appointment-feedback'
import { User } from './User'
import { Exam } from './exams'
import { Institution } from './Institution'
import { MedicalRecord } from './medical-record'
import { Prescription } from './prescription'
import { Report } from './report'
import { SickNote } from './sick-note'
import { Attachment } from './attachments'
import { AppointmentDiagnose } from './diagnose'
import { TApiAppointmentResponse } from './api/ApiAppointmentResponse'
import { FollowUp } from './follow-up'
import { AppointmentBrowseDataModel } from './@v2/appointment/appointment-browse-data.model'

export enum AppointmentStatus {
  WAITING_ATTENDANCE = 'WAITING_ATTENDANCE',
  IN_ATTENDANCE = 'IN_ATTENDANCE',
  WAITING_NURSE = 'WAITING_NURSE',
  WAITING_DOCTOR = 'WAITING_DOCTOR',
  WAITING_RECIPE = 'WAITING_RECIPE',
  WAITING_REMOVAL = 'WAITING_REMOVAL',
  FOLLOW_UP = 'FOLLOW_UP',
  FINISHED_REMOVAL = 'FINISHED_REMOVAL',
  FINISHED = 'FINISHED',
}

export enum AppointmentStepStatus {
  INITIALIZED = 'INITIALIZED',
  ENDED = 'ENDED',
}

export enum ScheduledAppointmentStatus {
  SCHEDULED = 'SCHEDULED',
  CANCELED = 'CANCELED',
  FINISHED = 'FINISHED',
  STARTED = 'STARTED',
}

export enum AppointmentQueue {
  DOCTOR = 'DOCTOR',
  NURSE = 'NURSE',
}

export class Appointment {
  id: number
  createdAt: Date
  updatedAt: Date | null
  closedAt: Date | null
  patientId: number
  requestedUserId: number
  complaint: Complaint
  classificationByAi?: string
  requestedUser: User
  patient: User
  institution?: Institution
  resume: string
  followUp: FollowUp[]
  roomMeetId: string | null
  status: AppointmentStatus
  finishedStatus: AppointmentFinishedStatus
  userRoleId: number
  institutionId: number
  exam: Exam[]
  queue: AppointmentQueue
  attachments: Attachment[]
  appointmentDiagnose: AppointmentDiagnose[]
  appointmentFeedback: AppointmentFeedback[]
  sickNote: SickNote[]
  prescription: Prescription[]
  report: Report[]
  medicalRecords: MedicalRecord[]
  canViewData: boolean
  scheduledAppointmentId: number
  documentId?: number
  document?: string
  appointmentStatusLog: any
  url?: string
  jitsiJwt: string
  meetingToken: string
  usersFromLog?: User[]

  constructor(params: TApiAppointmentResponse) {
    this.id = params.id
    this.createdAt = params.created_at
    this.updatedAt = params.updated_at
    this.followUp = params.follow_up
    this.classificationByAi = params?.classification_by_ai
    this.closedAt = params.closed_at
    this.patientId = params.patient_id
    this.requestedUserId = params.requested_user_id
    this.queue = params.queue
    this.complaint = params.complaint
    this.requestedUser = new User(params.requested_user || params.requestedUser)
    this.patient = new User(params.patient)
    this.resume = params.resume
    this.roomMeetId = params.room_meet_id
    this.status = params.status
    this.finishedStatus = params.finished_status
    this.userRoleId = params.user_role_id
    this.institutionId = params.institution_id
    this.exam = params.exam?.map((exam) => new Exam(exam))
    this.attachments = params.attachments?.map((attachment) => new Attachment(attachment))
    this.usersFromLog = params.usersFromLog?.map((user) => new User(user))
    this.appointmentDiagnose = params.appointmentDiagnose?.map(
      (appointmentDiagnose) => new AppointmentDiagnose(appointmentDiagnose),
    )
    this.appointmentFeedback = params.appointmentFeedback?.map(
      (feedback: TApiAppointmentFeedbackResponse) => new AppointmentFeedback(feedback),
    )
    this.sickNote = params.sickNote?.map((sickNote) => new SickNote(sickNote))
    this.prescription = params.prescription?.map((prescription) => new Prescription(prescription))
    this.report = params.report?.map((report) => new Report(report))
    this.medicalRecords = params.medicalRecords?.map(
      (medicalRecords) => new MedicalRecord(medicalRecords),
    )
    this.canViewData = params.canViewData
    this.scheduledAppointmentId = params.scheduled_appointment_id
    this.documentId = params?.document_id
    this.document = params.document
    this.appointmentStatusLog = params.appointment_status_log
    this.url = params.url
    this.jitsiJwt = params.jitsiJwt
    this.meetingToken = params.meeting?.token
    if (params?.institution) this.institution = new Institution(params?.institution)
  }

  getStatusLabel() {
    return AppointmentStatusDescription[this.status]
  }

  getComplaintLabel() {
    return ComplaintDescription[this.complaint]
  }

  getClosedAtDate() {
    return formatDate(String(this.closedAt), 'DD/MM/YYYY')
  }

  getCreatedAtDate() {
    return formatDate(String(this.createdAt), 'DD/MM/YYYY')
  }

  static sortedAppointmentListByStatus(list: AppointmentBrowseDataModel[]) {
    const categorizeAppointments = () => {
      const categorizedResults = {
        waitingList: [] as AppointmentBrowseDataModel[],
        inAttendanceList: [] as AppointmentBrowseDataModel[],
        followUpList: [] as AppointmentBrowseDataModel[],
        finishedList: [] as AppointmentBrowseDataModel[],
      }

      const statusMap = new Map<AppointmentStatus, keyof typeof categorizedResults>([
        [AppointmentStatus.WAITING_ATTENDANCE, 'waitingList'],
        [AppointmentStatus.WAITING_DOCTOR, 'waitingList'],
        [AppointmentStatus.WAITING_NURSE, 'waitingList'],
        [AppointmentStatus.WAITING_RECIPE, 'waitingList'],
        [AppointmentStatus.WAITING_REMOVAL, 'waitingList'],
        [AppointmentStatus.IN_ATTENDANCE, 'inAttendanceList'],
        [AppointmentStatus.FOLLOW_UP, 'followUpList'],
        [AppointmentStatus.FINISHED, 'finishedList'],
        [AppointmentStatus.FINISHED_REMOVAL, 'finishedList'],
      ])

      list?.forEach((appointment) => {
        const listKey = statusMap.get(appointment.status)

        if (listKey) {
          categorizedResults[listKey].push(appointment)
        }
      })

      return categorizedResults
    }

    const result = categorizeAppointments()

    return result
  }
}
