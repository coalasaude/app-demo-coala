import { DashboardOutput } from '../../../../domain/organizations/Dashboard'

export type DashboardQueryParams = {
  institutionId: number
}

export type AppointmentCountReqData = {
  countAppointments: number
  finishedAppointments: DashboardOutput[]
  onlyCallsPerc: number
}

export type AppointmentPerHourReqData = {
  hour: string
  count: number
}
