import { DefaultStatus } from '@/types/status'

import { User } from './User'
import { TApiUserResponse } from './api/ApiUserResponse'
import { Appointment } from './Appointment'

export interface TApiCidResponse {
  id: number
  code: string
  code_description: string
  category_description: string
}

export class Cid {
  id: number
  code: string
  codeDescription: string
  category_description: string

  constructor(params: TApiCidResponse) {
    this.id = params.id
    this.code = params.code
    this.codeDescription = params.code_description
    this.category_description = params.category_description
  }
}

export interface TApiAppointmentDiagnoseResponse {
  id: number
  appointment_id: number
  appointment?: Appointment
  cid_id: number
  user_id: number
  description: string
  type: CidAppointmentType
  created_at: Date
  date?: Date
  diagnoseExternal?: boolean
  status: DefaultStatus
  user: TApiUserResponse
  professional: TApiUserResponse
  professional_id: number
  cid: TApiCidResponse
}

export class AppointmentDiagnose {
  id: number
  appointmentId?: number
  appointment?: Appointment
  cidId?: number
  userId?: number
  description?: string
  type?: CidAppointmentType
  createdAt?: Date
  date?: Date
  diagnoseExternal?: boolean
  status?: DefaultStatus
  user?: User
  professional?: User
  professionalId?: number
  cid?: Cid

  constructor(params: TApiAppointmentDiagnoseResponse) {
    this.id = params.id
    this.appointmentId = params.appointment_id
    this.cidId = params.cid_id
    this.userId = params.user_id
    this.description = params.description
    this.type = params.type
    this.createdAt = params.created_at
    this.date = params.date
    this.diagnoseExternal = params.diagnoseExternal
    this.status = params.status
    this.user = new User(params.user)
    this.professional = new User(params.professional)
    this.professionalId = params.professional_id
    this.cid = new Cid(params.cid)
  }
}

export enum CidAppointmentType {
  HYPOTHESIS = 'HYPOTHESIS',
  FINAL = 'FINAL',
}
