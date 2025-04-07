import dayjs from 'dayjs'

import { DefaultStatus } from './status'
import { User } from './user'

export enum RecordsType {
  EXAM = 'exam',
  MEDICAL_RECORDS = 'medicalRecords',
  FOLLOWUP = 'FollowUp',
  SICKNOTE = 'sickNote',
  REPORTS = 'reports',
  ATTACHMENTS = 'Attachments',
  PRESCRIPTION = 'prescription',
  APPOINTMENT_DIAGNOSE = 'AppointmentDiagnose',
}

export interface RecordsResults<T = any> {
  id: number
  type: RecordsType
  status: DefaultStatus
  documentId: number
  professional: User
  user: User
  createdAt: Date
  data: T
}

export type RecordsReqData = {
  count: number
  results: Records[]
}

export type PrescriptionData = {
  typePrescription: PrescriptionType
  medicine: {
    id: number
    name: string
    observation: string
    recommendation: string
    concentration: number
    dosage: number
    created_at: string
    valid_until: string

    scheduledMedicine: {
      id: number
      name: string
    }

    medicineConcentrationUnit: {
      id: number
      name: string
    }

    dosageUnit: {
      id: number
      name: string
    }
  }[]
}

export class Records<T = any> {
  id: number
  type: RecordsType
  status: DefaultStatus
  documentId: number
  professional: User
  user: User
  createdAt: Date
  data: T

  constructor(params: RecordsResults) {
    this.id = params.id
    this.type = params.type
    this.status = params.status
    this.documentId = params.documentId
    this.professional = params.professional
    this.user = params.user
    this.createdAt = params.createdAt
    this.data = params.data
  }

  get formattedCreatedAt() {
    const d = dayjs(this.createdAt)
    const formattedDate = d.format('DD.MM.YYYY')
    const time = d.format('HH:mm')

    return `${formattedDate} | ${time}`
  }

  get translatedType() {
    const isPrescription = this.type === RecordsType.PRESCRIPTION

    if (isPrescription) {
      return `${RECORDS_TYPE_DESCRIPTION[this.type || '']} ${PRESCRIPTION_TYPE_DESCRIPTION[(this.data as PrescriptionData)?.typePrescription]}`
    }

    return RECORDS_TYPE_DESCRIPTION[this.type || '']
  }
}

export enum PrescriptionType {
  ESPECIAL = 'SPECIAL_CONTROL',
  SIMPLE = 'SIMPLE',
}

export const PRESCRIPTION_TYPE_DESCRIPTION: Record<PrescriptionType, string> = {
  [PrescriptionType.ESPECIAL]: 'especial',
  [PrescriptionType.SIMPLE]: 'simples',
}

export const RECORDS_TYPE_DESCRIPTION: Record<string, string> = {
  [RecordsType.EXAM]: 'Exame',
  [RecordsType.FOLLOWUP]: 'Acompanhamento',
  [RecordsType.MEDICAL_RECORDS]: 'Atendimento',
  [RecordsType.SICKNOTE]: 'Atestado',
  [RecordsType.REPORTS]: 'Relatório',
  [RecordsType.ATTACHMENTS]: 'Anexo',
  [RecordsType.PRESCRIPTION]: 'Receituário',
  [RecordsType.APPOINTMENT_DIAGNOSE]: 'Diagnóstico',
}

export const RECORDS_TYPE_DESCRIPTION_PROGRESS: Record<string, string> = {
  [RecordsType.EXAM]: 'Exames',
  [RecordsType.FOLLOWUP]: 'Acompanhamento',
  [RecordsType.MEDICAL_RECORDS]: 'Pronto atendimento',
  [RecordsType.SICKNOTE]: 'Atestados',
  [RecordsType.REPORTS]: 'Relatórios',
  [RecordsType.ATTACHMENTS]: 'Anexos',
  [RecordsType.PRESCRIPTION]: 'Receituários',
  [RecordsType.APPOINTMENT_DIAGNOSE]: 'Diagnóstico',
}

export const RecordsTypeOptions = [
  {
    label: RECORDS_TYPE_DESCRIPTION[RecordsType.EXAM],
    value: RecordsType.EXAM,
  },
  {
    label: RECORDS_TYPE_DESCRIPTION[RecordsType.MEDICAL_RECORDS],
    value: RecordsType.MEDICAL_RECORDS,
  },
  {
    label: RECORDS_TYPE_DESCRIPTION[RecordsType.FOLLOWUP],
    value: RecordsType.FOLLOWUP,
  },
  {
    label: RECORDS_TYPE_DESCRIPTION[RecordsType.SICKNOTE],
    value: RecordsType.SICKNOTE,
  },
  {
    label: RECORDS_TYPE_DESCRIPTION[RecordsType.REPORTS],
    value: RecordsType.REPORTS,
  },
  {
    label: RECORDS_TYPE_DESCRIPTION[RecordsType.ATTACHMENTS],
    value: RecordsType.ATTACHMENTS,
  },
  {
    label: RECORDS_TYPE_DESCRIPTION[RecordsType.PRESCRIPTION],
    value: RecordsType.PRESCRIPTION,
  },
  {
    label: RECORDS_TYPE_DESCRIPTION[RecordsType.APPOINTMENT_DIAGNOSE],
    value: RecordsType.APPOINTMENT_DIAGNOSE,
  },
]

export enum RecordsPath {
  EXAM = 'EXAM',
  FOLLOW_UP = 'FOLLOW_UP',
  MEDICAL_RECORD = 'MEDICAL_RECORD',
  SICK_NOTE = 'SICK_NOTE',
  REPORT = 'REPORT',
  ATTACHMENT = 'ATTACHMENT',
  PRESCRIPTION = 'PRESCRIPTION',
}
