import dayjs from 'dayjs'

import { Appointment } from './Appointment'
import { Record } from './Record'
import { User } from './User'
import { MentalHealthScheduleStatus, TMentalHealthSchedule } from './api/ApiMentalHealthSchedule'

export class MentalHealthSchedule {
  id: number
  status: MentalHealthScheduleStatus = MentalHealthScheduleStatus.Agendada
  toStudent: boolean
  start: Date
  end: Date
  professional?: User
  responsible?: User[] = []
  collaborator?: User
  appointment?: Appointment
  createdAt: string
  updatedAt: Date
  records?: Record[]
  canJoin?: boolean

  constructor(params: TMentalHealthSchedule) {
    this.id = params.id
    this.status = params.status
    this.toStudent = params.toStudent
    this.start = new Date(params.start)
    this.end = new Date(params.end)
    this.createdAt = params.createdAt
    this.updatedAt = params.updated_at
    this.canJoin = params.canJoin

    if (params?.appointment) {
      this.appointment = new Appointment(params.appointment)
    }

    if (params?.professional) {
      this.professional = new User(params.professional)
    }

    if (params?.collaborator) {
      this.collaborator = new User(params.collaborator)
    }

    if (params?.responsible?.length) {
      this.responsible = params.responsible.map(
        (responsible) => responsible && new User(responsible),
      )
    }

    if (params?.records?.length) {
      this.records = params.records.map((record) => record && new Record(record))
    }
  }

  getFormattedDateFromStartTime() {
    const date = new Date(this.start)
    const day = String(date.getUTCDate()).padStart(2, '0')
    const month = String(date.getUTCMonth() + 1).padStart(2, '0')
    const year = date.getUTCFullYear()

    return `${day}/${month}/${year}`
  }

  getStartToEndTimeRange() {
    if (!this.start || !this.end) return 'Horário não informado'
    const startDate = dayjs(this.start)
    const endDate = dayjs(this.end)
    const formattedStartTime = startDate.format('HH:mm')
    const formattedEndTime = endDate.format('HH:mm')

    return `${formattedStartTime}-${formattedEndTime}`
  }
}
