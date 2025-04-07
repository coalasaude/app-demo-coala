import dayjs from 'dayjs'

import { DefaultStatus } from '@/types/status'

import { User } from './User'
import { TApiUserResponse } from './api/ApiUserResponse'

export interface MedicineConcentrationUnit {
  id: number
  name: string
  created_at: string
  updated_at: string | null
}

export interface MedicineDosageUnit {
  id: number
  name: string
  created_at: string
  updated_at: string | null
}

export interface ScheduledMedicine {
  id: number
  name: string
  hour: number | null
  created_at: string
  updated_at: string | null
}

export interface ScheduledMedicineHours {
  id: number
  medicine_id: number
  hour: number
  created_at: Date
  updated_at: Date | null
}

export interface Document {
  id: number
  documentUrl: string
  bucketName: string
  filename: string
  pin?: number
  createAt: Date
  updateAt?: Date
}

export interface Prescription {
  id: number
  valid_until: Date
  document_id?: number
  professional: User
  professional_id: number
  medicine: Medicine[]
  status: DefaultStatus
  invalidatedAt?: Date
  appointmentId: number
  created_at: Date
  update_at?: Date
  document?: Document
}

export enum DateFilter {
  TODAY = 'today',
  AT_WEEK = 'at_week',
  IN_THIS_MONTH = 'in_this_month',
  HOUR1 = 'hour_1',
  HOUR2 = 'hour_2',
  HOUR3 = 'hour_3',
  HOUR4 = 'hour_4',
  HOUR5 = 'hour_5',
}

export enum AuthorizationStatus {
  PENDING = 'PENDING',
  AUTHORIZED = 'AUTHORIZED',
  NOT_AUTHORIZED = 'NOT_AUTHORIZED',
  AUTHORIZED_SCHOOL = 'AUTHORIZED_SCHOOL',
}

export enum MedicineUsageStatus {
  VALID = 'VALID',
  INVALID = 'INVALID',
  STOPPED = 'STOPPED',
}

export interface TApiMedicineResponse {
  id: number
  name: string
  concentration: number
  medicineConcentrationUnit: MedicineConcentrationUnit
  dosageUnit: MedicineDosageUnit
  scheduledMedicine: ScheduledMedicine
  medicine_concentration_unit_id: number
  medicine_dosage_unit_id: number
  dosage: number
  scheduled_medicine_id: number
  start_hour: number
  start_date: string | null
  valid_until: string | null
  recommendation: string | null
  observation: string | null
  status: DefaultStatus
  document_id: number
  user_id: number
  user: TApiUserResponse
  created_at: Date
  updated_at: string | null
  prescription_id: number
  authorization_status: AuthorizationStatus
  ScheduledMedicineHours: ScheduledMedicineHours[]
  isSOS?: boolean
  isContinuousUsage?: boolean
  medicineUrl?: string
  prescriptionUrl?: string
  prescription?: Prescription
  document?: Document
  userCreator?: TApiUserResponse
}

export class Medicine {
  id?: number
  name?: string
  concentration?: number
  medicineConcentrationUnit?: MedicineConcentrationUnit
  dosageUnit?: MedicineDosageUnit
  scheduledMedicine?: ScheduledMedicine
  medicineConcentrationUnitId?: number
  medicineDosageUnitId?: number
  dosage?: number
  scheduledMedicineId?: number
  startHour?: number
  startDate?: string | null
  validUntil?: string | null
  recommendation?: string | null
  status?: DefaultStatus
  documentId?: number
  userId?: number
  user?: User
  createdAt?: Date
  updatedAt?: string | null
  prescriptionId?: number
  authorizationStatus?: AuthorizationStatus
  scheduledMedicineHours?: ScheduledMedicineHours[]
  isSOS?: boolean
  isContinuousUsage?: boolean
  observation?: string | null
  medicineUrl?: string
  prescriptionUrl?: string
  prescription?: Prescription
  document?: Document
  userCreator?: User

  constructor(params: TApiMedicineResponse) {
    this.id = params.id
    this.name = params.name
    this.concentration = params.concentration
    this.medicineConcentrationUnit = params.medicineConcentrationUnit
    this.dosageUnit = params.dosageUnit
    this.scheduledMedicine = params.scheduledMedicine
    this.medicineConcentrationUnitId = params.medicine_concentration_unit_id
    this.medicineDosageUnitId = params.medicine_dosage_unit_id
    this.dosage = params.dosage
    this.scheduledMedicineId = params.scheduled_medicine_id
    this.startHour = params.start_hour
    this.startDate = params.start_date
    this.validUntil = params.valid_until
    this.recommendation = params.recommendation
    this.status = params.status
    this.documentId = params.document_id
    this.userId = params.user_id
    this.user = new User(params.user)
    this.createdAt = params.created_at
    this.updatedAt = params.updated_at
    this.prescriptionId = params.prescription_id
    this.authorizationStatus = params.authorization_status
    this.scheduledMedicineHours = params.ScheduledMedicineHours
    this.isSOS = params.isSOS
    this.isContinuousUsage = params.isContinuousUsage
    this.medicineUrl = params.medicineUrl
    this.prescriptionUrl = params.prescriptionUrl
    this.prescription = params.prescription
    this.document = params.document
    this.observation = params.observation
    this.userCreator = params.userCreator ? new User(params.userCreator) : undefined
  }

  getUsageString() {
    if (this.isContinuousUsage) {
      return 'Contínuo'
    } else if (this.validUntil) {
      const daysTreatment = this.getTreatmentsDays()
      const isPlural = daysTreatment > 0
      return `Por ${daysTreatment} dia${isPlural ? 's' : ''}`
    }

    return ''
  }

  getUsageInitDateString() {
    const text = []

    if (this.isSOS) {
      return 'SOS'
    }
    if (this.startDate) {
      text.push(dayjs(this.startDate).format('DD/MM/YYYY'))
    }
    if (this.startHour) {
      text.push(
        dayjs()
          .set('hour', this.startHour || 0)
          .set('minute', 0)
          .format('HH:mm'),
      )
    }

    return text.join('\n')
  }

  getStartDate() {
    return dayjs(this.startDate).format('DD/MM/YYYY')
  }

  getStartHour() {
    return dayjs(this.startHour, 'HH:mm').format('HH:mm')
  }

  getDosageString() {
    const includeSpace = !['ml', 'mg'].includes(this.dosageUnit?.name || '')
    return `${this.dosage || ''}${includeSpace ? ' ' : ''}${this.dosageUnit?.name || ''}`
  }

  getConcentrationString() {
    const includeSpace = !['ml', 'mg'].includes(this.medicineConcentrationUnit?.name || '')
    return `${this.concentration || ''}${includeSpace ? ' ' : ''}${
      this.medicineConcentrationUnit?.name || ''
    }`
  }

  getFrequency() {
    return this.scheduledMedicine?.name || ''
  }

  getPackagePhoto() {
    return {
      url: this.document?.documentUrl,
      name: this.document?.filename,
    }
  }

  getPrescriptionFile() {
    return {
      url: this.prescription?.document?.documentUrl,
      name: this.prescription?.document?.filename,
    }
  }

  getTreatmentsDays() {
    if (this.isContinuousUsage) return 0
    return this.validUntil
      ? dayjs(this.validUntil).diff(this.startDate || this.createdAt, 'days')
      : 0
  }

  getHourDate() {
    return this.startHour ? dayjs(this.startHour, 'HH:mm').toDate() : null
  }

  isFromAppointment() {
    return !!this.prescription?.appointmentId
  }

  isPendingApprovement() {
    return !!this.isFromAppointment() && this.authorizationStatus === AuthorizationStatus.PENDING
  }
}
