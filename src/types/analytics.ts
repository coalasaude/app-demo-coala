import { AppointmentFinishedStatus } from '@/constants/appointment'

import { Complaint } from './complaint'
import { User } from './user'

export type ComplaintReqData = Record<Complaint, number>

export interface AvarageTimeReqData {
  averageAwaitingTime: number
  averageDurationTime: number
}

export type AppointmentConclusionReqData = Record<AppointmentFinishedStatus, number>

export interface RankingUserReqData {
  user: User
  count: number
}

export interface RankingReqData {
  claimants: RankingUserReqData[]
  doctors: RankingUserReqData[]
  patients: RankingUserReqData[]
}

export interface PercentageFill {
  FINISHED: number
}

export interface AppointmentReqData {
  appointmentsByMonth: Record<string, number>
  requestedAppointments: number
  closedAppointments: number
  appointmentsInProgress: number
  resubility: number
}
