import { Image } from '@/v3/domain/Image'

export class DashboardOutput {
  public readonly status: string
  public readonly count: number

  constructor(props: DashboardOutput) {
    this.status = props.status
    this.count = props.count
  }
}

export class ActivatedUsersOutput {
  public readonly allUsers: number
  public readonly usersActivated: number
  public readonly percent: number

  constructor(props: ActivatedUsersOutput) {
    this.allUsers = props.allUsers
    this.usersActivated = props.usersActivated
    this.percent = props.percent
  }
}

export class AppointmentPerHourOutput {
  public readonly hour: string
  public readonly count: number

  constructor(data: AppointmentPerHourOutput) {
    this.hour = data.hour
    this.count = data.count
  }
}

export class AverageTimeOutput {
  public readonly averageDurationTime: number
  public readonly averageWaitingTime: number

  constructor(data: AverageTimeOutput) {
    this.averageDurationTime = data.averageDurationTime
    this.averageWaitingTime = data.averageWaitingTime
  }
}

export class CourseUsersOutput {
  public readonly id: number
  public readonly name: string
  public readonly hasCertificate: boolean
  public readonly inCourse: boolean
  public readonly profile: string
  public readonly image?: Image

  constructor(props: CourseUsersOutput) {
    this.id = props.id
    this.name = props.name
    this.hasCertificate = props.hasCertificate
    this.inCourse = props.inCourse
    this.profile = props.profile
    this.image = props.image
  }
}

export class HealthHistoryFilledOutput {
  public readonly usersFilled: number
  public readonly allUsers: number

  constructor(props: HealthHistoryFilledOutput) {
    this.usersFilled = props.usersFilled
    this.allUsers = props.allUsers
  }
}

export class LastSixMonthsAppointmentsOutput {
  public readonly month: string
  public readonly count: number

  constructor(props: LastSixMonthsAppointmentsOutput) {
    this.month = props.month
    this.count = props.count
  }
}

export class RankComplaintAppointmentOutput {
  public readonly complaint: string
  public readonly count: number

  constructor(props: RankComplaintAppointmentOutput) {
    this.complaint = props.complaint
    this.count = props.count
  }
}

export class RankPatientAppointmentOutput {
  public readonly id: number
  public readonly patient: string
  public readonly count: number
  public readonly profile: string
  public readonly image?: Image

  constructor(props: RankPatientAppointmentOutput) {
    this.id = props.id
    this.patient = props.patient
    this.count = props.count
    this.profile = props.profile
    this.image = props.image
  }
}
