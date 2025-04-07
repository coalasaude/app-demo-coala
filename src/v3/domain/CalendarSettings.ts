import { TApiCalendarSettings } from './api/ApiCalendarSettings'

export class CalendarSettings {
  id: number
  day: string
  startTime: string
  endTime: string
  userId: number
  createdAt: string
  updatedAt: string

  constructor(indication: TApiCalendarSettings) {
    this.id = indication.id
    this.day = indication.day
    this.startTime = indication.startTime
    this.endTime = indication.endTime
    this.userId = indication.userId
    this.createdAt = indication.createdAt
    this.updatedAt = indication.updatedAt
  }
}
