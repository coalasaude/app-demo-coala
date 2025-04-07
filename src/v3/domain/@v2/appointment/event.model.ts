import { formatTicketDate } from '@/v3/presentation/pages/appointment/Emergency/utils/formatTicketDate'

import { RecordEvent } from './record-event.model'

export enum TimelineEvent {
  RECORD = 'RECORD',
  FINISHED = 'FINISHED',
  START = 'START',
  CREATED = 'CREATED',
  DOCTOR_ATTENDANCE = 'DOCTOR_ATTENDANCE',
  NURSE_ATTENDANCE = 'NURSE_ATTENDANCE',
}

export type EventModelConstructor = {
  type: TimelineEvent
  createdAt: string
  data?: RecordEvent
}

export class EventModel {
  type: TimelineEvent
  createdAt: Date
  data?: RecordEvent

  constructor(data: EventModelConstructor) {
    this.type = data.type
    this.createdAt = new Date(data.createdAt)
    this.data = data.data ? new RecordEvent(data.data) : undefined
  }

  get description() {
    const isRecord =
      this.type === TimelineEvent.RECORD ||
      this.type === TimelineEvent.DOCTOR_ATTENDANCE ||
      this.type === TimelineEvent.NURSE_ATTENDANCE

    if (isRecord) {
      return `${this.data?.creator.fullName} | ${formatTicketDate(this.createdAt)}`
    }

    return formatTicketDate(this.createdAt)
  }

  getCreatorFullName() {
    return this.data?.creator.fullName
  }

  getFormatedCreatedAtDate() {
    return formatTicketDate(this.createdAt)
  }
}
