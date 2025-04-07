import { DefaultStatus } from './status'
import { User } from './user'

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

export interface Medicine {
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
  status: DefaultStatus
  document_id: number
  user_id: number
  user: User
  created_at: Date
  updated_at: string | null
  prescription_id: number
  authorization_status: AuthorizationStatus
  ScheduledMedicineHours: ScheduledMedicineHours[]
  medicineUrl?: string
  prescriptionUrl?: string
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
  AUTHORIZED_SCHOOL = 'AUTHORIZED_SCHOOL',
  NOT_AUTHORIZED = 'NOT_AUTHORIZED',
}
