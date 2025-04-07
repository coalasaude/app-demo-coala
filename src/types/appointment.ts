import { FollowUp } from '@/v3/domain/follow-up'
import { AppointmentQueue } from '@/v3/domain/Appointment'
import { AppointmentFinishedStatus } from '@/constants/appointment'

import { AppointmentFeedback } from './AppointmentFeedback'
import { Attachments } from './Attachments'
import { Cid } from './cid'
import { Complaint } from './complaint'
import { Exam } from './exams'
import { Institution } from './institution'
import { MedicalRecord } from './medicalRecord'
import { Prescription } from './prescription'
import { Report } from './report'
import { SickNote } from './sickNote'
import { User } from './user'

export interface Appointment {
  id: number
  created_at: Date
  updated_at: Date | null
  closed_at: Date | null
  patient_id?: number
  requested_user_id: number
  complaint: Complaint
  queue: AppointmentQueue
  requestedUser: User
  requested_user: User
  patient?: User
  institution: Institution
  resume: string
  follow_up: FollowUp[]
  finished_status: AppointmentFinishedStatus
  room_meet_id: string | null
  status: AppointmentStatus
  user_role_id: number
  institution_id: number
  exam: Exam[]
  attachments: Attachments[]
  cid: Cid[]
  appointmentFeedback: AppointmentFeedback[]
  sickNote: SickNote[]
  prescription: Prescription[]
  report: Report[]
  medicalRecords: MedicalRecord[]
  canViewData: boolean
  scheduled_appointment_id: number
  document_id?: number
  document?: string
  AppointmentStatusLog: AppointmentStatusLog[]
  appointment_status_log: any
  scheduled_mental_health_id: number
  url?: string
  meeting: { token: string }
}

export enum AppointmentStatus {
  WAITING_ATTENDANCE = 'WAITING_ATTENDANCE',
  WAITING_NURSE = 'WAITING_NURSE',
  WAITING_DOCTOR = 'WAITING_DOCTOR',
  IN_ATTENDANCE = 'IN_ATTENDANCE',
  FOLLOW_UP = 'FOLLOW_UP',
  FINISHED = 'FINISHED',
}

export enum ScheduledAppointmentStatus {
  SCHEDULED = 'SCHEDULED',
  CANCELED = 'CANCELED',
  FINISHED = 'FINISHED',
  STARTED = 'STARTED',
}

export interface AppointmentStatusLog {
  id: number
  appointment_id: number
  user_id: number | null
  oldStatus: AppointmentStatus | null
  newStatus: AppointmentStatus
  createdAt: Date
  updated_at: Date | null
}
