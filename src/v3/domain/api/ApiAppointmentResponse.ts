import { Complaint } from '@/types/complaint'
import { AppointmentFinishedStatus } from '@/constants/appointment'

import { AppointmentQueue, AppointmentStatus } from '../Appointment'
import { TApiAppointmentFeedbackResponse } from '../appointment-feedback'
import { TApiAttachmentsResponse } from '../attachments'
import { TApiAppointmentDiagnoseResponse } from '../diagnose'
import { TApiExamResponse } from '../exams'
import { TApiMedicalRecordResponse } from '../medical-record'
import { TApiPrescriptionResponse } from '../prescription'
import { TApiSickNoteResponse } from '../sick-note'
import { TApiReportResponse } from '../report'
import { FollowUp } from '../follow-up'

import { TApiUserResponse } from './ApiUserResponse'
import { TApiInstitutionResponse } from './ApiInstitutionResponse'

export interface TApiAppointmentResponse {
  id: number
  created_at: Date
  updated_at: Date | null
  institution: TApiInstitutionResponse
  closed_at: Date | null
  patient_id: number
  requested_user_id: number
  complaint: Complaint
  classification_by_ai?: string
  requestedUser: TApiUserResponse
  requested_user: TApiUserResponse
  patient: TApiUserResponse
  resume: string
  room_meet_id: string | null
  status: AppointmentStatus
  finished_status: AppointmentFinishedStatus
  follow_up: FollowUp[]
  user_role_id: number
  queue: AppointmentQueue
  institution_id: number
  exam: TApiExamResponse[]
  attachments: TApiAttachmentsResponse[]
  appointmentDiagnose: TApiAppointmentDiagnoseResponse[]
  appointmentFeedback: TApiAppointmentFeedbackResponse[]
  sickNote: TApiSickNoteResponse[]
  prescription: TApiPrescriptionResponse[]
  report: TApiReportResponse[]
  medicalRecords: TApiMedicalRecordResponse[]
  canViewData: boolean
  scheduled_appointment_id: number
  document_id?: number
  document?: string
  AppointmentStatusLog: any
  appointment_status_log: any
  url?: string
  jitsiJwt: string
  usersFromLog: TApiUserResponse[]
  meeting: {
    token: string
  }
}
