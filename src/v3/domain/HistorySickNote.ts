import dayjs from 'dayjs'

import { Document } from './Document'
import { DefaultStatus } from './api/ApiCourseResponse'
import { THistorySickNote } from './api/ApiHistorySickNote'

export class HistorySickNote {
  id: number
  appointmentDate: Date
  validUntil: Date
  description: string | null
  status: DefaultStatus
  documentId: number
  createdAt: Date
  isSickNoteValid: boolean
  isExternal: boolean
  document: Document | null

  constructor(params: THistorySickNote) {
    this.id = params.id
    this.appointmentDate = params.appointmentDate
    this.validUntil = params.validUntil
    this.description = params.description
    this.status = params.status
    this.documentId = params.documentId
    this.createdAt = params.createdAt
    this.isSickNoteValid = params.isSickNoteValid
    this.isExternal = params.isExternal
    this.document = params.document ? new Document(params.document) : null
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
