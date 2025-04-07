import { TApiAppointmentResponse } from './ApiAppointmentResponse'
import { TMentalHealthRecord } from './ApiMentalHealthRecord'
import { TApiUserResponse } from './ApiUserResponse'

export enum MentalHealthScheduleStatus {
  Agendada = 'Agendada',
  Confirmada = 'Confirmada',
  Cancelada = 'Cancelada',
  Realizada = 'Realizada',
  NaoRealizada = 'NaoRealizada',
}

export interface TMentalHealthSchedule {
  id: number
  status: MentalHealthScheduleStatus
  toStudent: boolean
  start: Date
  end: Date
  professional?: TApiUserResponse
  responsible?: TApiUserResponse[]
  collaborator?: TApiUserResponse
  appointment?: TApiAppointmentResponse
  createdAt: string
  updated_at: Date
  records?: TMentalHealthRecord[]
  canJoin?: boolean
}
