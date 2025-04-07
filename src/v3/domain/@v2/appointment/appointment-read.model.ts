import {
  AppointmentReadDataModelConstructor,
  AppointmentReadDataModel,
} from './appointment-read-data.model'

export interface AppointmentReadModelConstructor {
  appointment: AppointmentReadDataModelConstructor
  meeting: { token: string; roomId: string }
}

export class AppointmentReadModel {
  public readonly appointment: AppointmentReadDataModel
  public readonly meeting: { token: string; roomId: string }

  constructor(params: AppointmentReadModelConstructor) {
    this.appointment = new AppointmentReadDataModel(params.appointment)
    this.meeting = params.meeting
  }
}
