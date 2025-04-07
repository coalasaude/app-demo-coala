import { DefaultStatus } from '@/types/status'

import { Appointment } from './Appointment'
import { Medicine, TApiMedicineResponse } from './medicine'
import { User } from './User'
import { TApiUserResponse } from './api/ApiUserResponse'

export interface TApiPrescriptionResponse {
  id: number
  created_at: Date
  updated_at: Date | null
  valid_until: Date
  document: string
  pin: number
  professional_id: number
  professional_role_id: number
  type_prescription: PrescriptionEnum
  status: DefaultStatus
  invalidated_at: Date | null
  appointment_id: number
  appointment: Appointment
  professional: TApiUserResponse
  document_id: number
  medicine: TApiMedicineResponse[]
}

export enum PrescriptionEnum {
  SIMPLE = 'SIMPLE',
  SPECIAL_CONTROL = 'SPECIAL_CONTROL',
}

export class Prescription {
  id?: number
  createdAt?: Date
  updatedAt?: Date | null
  validUntil?: Date
  document?: string
  pin?: number
  professionalId?: number
  professionalRoleId?: number
  typePrescription?: PrescriptionEnum
  status?: DefaultStatus
  invalidatedAt?: Date | null
  appointmentId?: number
  appointment?: Appointment
  professional?: User
  documentId?: number
  medicine?: Medicine[]

  constructor(params: TApiPrescriptionResponse) {
    this.id = params.id
    this.createdAt = params.created_at
    this.updatedAt = params.updated_at
    this.validUntil = params.valid_until
    this.document = params.document
    this.pin = params.pin
    this.professionalId = params.professional_id
    this.professionalRoleId = params.professional_role_id
    this.typePrescription = params.type_prescription
    this.status = params.status
    this.invalidatedAt = params.invalidated_at
    this.appointmentId = params.appointment_id
    this.appointment = params.appointment
    this.professional = new User(params.professional)
    this.documentId = params.document_id
    this.medicine = params.medicine?.map((medicine) => new Medicine(medicine))
  }
}
