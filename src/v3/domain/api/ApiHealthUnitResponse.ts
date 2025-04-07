import { Institution } from '@/types/institution'
import { DefaultStatus } from '@/types/status'

export enum HealUnitPatientType {
  ADULT = 'ADULT',
  PEDIATRIC = 'PEDIATRIC',
}

export enum HealthUnitCareModality {
  APPOINTMENT = 'APPOINTMENT',
  EMERGENCY = 'EMERGENCY',
  ADMISSION = 'ADMISSION',
}

export enum HealthUnitPaymentMethods {
  PIX = 'PIX',
  TRANSFER = 'TRANSFER',
  CARD = 'CARD',
  BILLING = 'BILLING',
}

export enum HealthUnitImagingExams {
  TOMOGRAPHY = 'TOMOGRAPHY',
  RESONANCE = 'RESONANCE',
  XRAY = 'XRAY',
  ULTRASONOGRAPHY = 'ULTRASONOGRAPHY',
}

export enum HealthUnitLaboratoryExams {
  BLOOD = 'BLOOD',
  HEMOCULTURE = 'HEMOCULTURE',
  URINE = 'URINE',
  UROCULTURE = 'UROCULTURE',
}

export enum HealthUnitCareUnits {
  WARD = 'WARD',
  ROOM = 'ROOM',
  CTI = 'CTI',
}

export enum HealthUnitType {
  HOSPITAL = 'HOSPITAL',
  ORTHOPEDIC = 'ORTHOPEDIC',
  OPHTHALMOLOGY = 'OPHTHALMOLOGY',
  DENTISTRY = 'DENTISTRY',
  OTOLARYNGOLOGY = 'OTOLARYNGOLOGY',
}

export enum HealthUnitImmobilizationTypes {
  PLASTER = 'PLASTER',
  SPLINT = 'SPLINT',
  IMMOBILIZER = 'IMMOBILIZER',
}

export interface HealthUnitAddress {
  street: string
  neighborhood: string
  complement: string | undefined
  block: string | undefined
  state: string
  city: string
  zipCode: string
  number: string | null
}

export interface Bank {
  bank?: string
  branch?: string
  account?: string
}

export interface Company {
  companyName?: string
  cnpj?: string
  name: string
  address: HealthUnitAddress
  email: string
  telephone: string
  whatsapp?: string
  healthUnitType: HealthUnitType
}

export interface Infrasctructure {
  openAt?: string
  closeAt?: string
  patientType?: HealUnitPatientType[]
  careModality?: HealthUnitCareModality[]
  notes?: string
}

export interface Financial {
  appointmentAvaregePrice?: string
  responsableFinance?: string
  paymentMethod?: HealthUnitPaymentMethods[]
  bank?: Bank
  pixKey?: string
}

export interface Appointment {
  doSutures?: boolean
  doMedication?: boolean
  doSurgery?: boolean
  imagingExams?: HealthUnitImagingExams[]
  laboratoryExams?: HealthUnitLaboratoryExams[]
  careUnits?: HealthUnitCareUnits[]
  imobilizationTypes?: HealthUnitImmobilizationTypes[]
}

export interface THealthUnitResponse {
  id?: number
  status?: DefaultStatus
  company: Company
  infrastructure: Infrasctructure
  financial: Financial
  appointment: Appointment
  institutions?: Institution[]
}
