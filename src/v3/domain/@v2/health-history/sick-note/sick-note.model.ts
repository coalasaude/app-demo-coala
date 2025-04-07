import dayjs from 'dayjs'

import { DefaultStatus } from '@/types/status'

import { AppFileModel } from '../../@shared/app-file.model'

export interface SickNoteModelConstructor {
  id: number
  document: AppFileModel
  appointmentDate: Date
  validUntil: Date
  description?: string
  status: DefaultStatus
  createdAt: Date
  isSickNoteValid: boolean
  isExternal: boolean
}

export class SickNoteModel {
  public readonly id: number
  public readonly document?: AppFileModel
  public readonly appointmentDate: Date
  public readonly validUntil: Date
  public readonly description?: string
  public readonly status: DefaultStatus
  public readonly createdAt: Date
  public readonly isSickNoteValid: boolean
  public readonly isExternal: boolean

  constructor(props: SickNoteModelConstructor) {
    this.id = props?.id
    this.document = props.document ? new AppFileModel(props.document) : undefined
    this.appointmentDate = props.appointmentDate
    this.validUntil = props.validUntil
    this.description = props.description
    this.status = props.status
    this.createdAt = props.createdAt
    this.isSickNoteValid = props.isSickNoteValid
    this.isExternal = props.isExternal
  }

  getStatusLabel() {
    return this.isSickNoteValid ? 'Vigente' : 'Encerrado'
  }

  getFormattedAppointmentDate() {
    if (this.appointmentDate) return dayjs(this.appointmentDate).format('DD/MM/YYYY')

    return ''
  }

  getFormattedValidUntil() {
    if (this.validUntil) return dayjs(this.validUntil).format('DD/MM/YYYY')

    return ''
  }

  getTypeLabel() {
    return this.isExternal ? 'Externo' : 'Coala'
  }

  getFormattedAppointmentHour() {
    if (this.appointmentDate) return dayjs(this.appointmentDate).format('HH:mm')

    return ''
  }

  getSickNoteValidityPeriod() {
    if (this.appointmentDate && this.validUntil) {
      const start = dayjs(this.appointmentDate)
      const end = dayjs(this.validUntil)
      return end.diff(start, 'days')
    }

    return 0
  }

  getSickNoteValidityPeriodString() {
    const days = this.getSickNoteValidityPeriod()

    if (days === 1) return '1 dia'
    if (days > 1) return `${days} dias`

    return '-'
  }
}
