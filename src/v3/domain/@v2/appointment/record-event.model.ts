import { RecordsType } from '@/types/records'

import { DefaultStatus } from '../../api/ApiCourseResponse'

import { Creator } from './creator.model'
import { EventRecordsType } from './enum/event-records-type.enum'

export const RECORDS_TYPE_DESCRIPTION: Record<string, string> = {
  [EventRecordsType.EXAM]: 'Exame',
  [EventRecordsType.MEDICAL_RECORDS]: 'Atendimento',
  [EventRecordsType.SICK_NOTE]: 'Atestado',
  [EventRecordsType.REPORTS]: 'Relatório',
  [EventRecordsType.ATTACHMENTS]: 'Anexo',
  [EventRecordsType.PRESCRIPTION]: 'Receituário simples',
  [EventRecordsType.SPECIAL_PRESCRIPTION]: 'Receituário especial',
  [EventRecordsType.DIAGNOSE]: 'Diagnóstico',
}

export type RecordEventConstructor = {
  id: number
  type: EventRecordsType
  creator: Creator
  status: DefaultStatus
}

export class RecordEvent {
  id: number
  type: EventRecordsType
  creator: Creator
  status: DefaultStatus

  constructor(params: RecordEventConstructor) {
    this.id = params.id
    this.type = params.type
    this.creator = new Creator(params.creator)
    this.status = params.status
  }

  get translatedType() {
    return RECORDS_TYPE_DESCRIPTION[this.type || '']
  }

  get recordType() {
    const mapper = {
      [EventRecordsType.EXAM]: RecordsType.EXAM,
      [EventRecordsType.MEDICAL_RECORDS]: RecordsType.MEDICAL_RECORDS,
      [EventRecordsType.SICK_NOTE]: RecordsType.SICKNOTE,
      [EventRecordsType.REPORTS]: RecordsType.REPORTS,
      [EventRecordsType.ATTACHMENTS]: RecordsType.ATTACHMENTS,
      [EventRecordsType.PRESCRIPTION]: RecordsType.PRESCRIPTION,
      [EventRecordsType.SPECIAL_PRESCRIPTION]: RecordsType.PRESCRIPTION,
      [EventRecordsType.DIAGNOSE]: RecordsType.APPOINTMENT_DIAGNOSE,
    }

    return mapper[this.type]
  }
}
