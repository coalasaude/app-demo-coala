import { User } from './User'
import { TApiAppointmentResponse } from './api/ApiAppointmentResponse'
import { TApiUserResponse } from './api/ApiUserResponse'
import { Appointment } from './Appointment'

export enum GradeStatus {
  VERY_SATISFIED = 'VERY_SATISFIED',
  SATISFIED = 'SATISFIED',
  INDIFFERENT = 'INDIFFERENT',
  DISSATISFIED = 'DISSATISFIED',
  VERY_DISSATISFIED = 'VERY_DISSATISFIED',
}

export interface TApiAppointmentFeedbackResponse {
  id: number
  appointment: TApiAppointmentResponse
  appointment_id: number
  user: TApiUserResponse
  user_id: number
  grade: GradeStatus
  comment: string
  created_at: Date
  updated_at: Date | null
}

export class AppointmentFeedback {
  id: number
  appointment: Appointment
  appointmentId: number
  user: User
  userId: number
  grade: GradeStatus
  comment: string
  createdAt: Date
  updatedAt: Date | null

  constructor(params: TApiAppointmentFeedbackResponse) {
    this.id = params.id
    this.appointment = new Appointment(params.appointment)
    this.appointmentId = params.appointment_id
    this.user = new User(params.user)
    this.userId = params.user_id
    this.grade = params.grade
    this.comment = params.comment
    this.createdAt = params.created_at
    this.updatedAt = params.updated_at
  }
}
