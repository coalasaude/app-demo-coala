import { PaginationModel, PaginationModelModelConstructor } from '../@shared/pagination.model'

import {
  AppointmentBrowseDataModelConstructor,
  AppointmentBrowseDataModel,
} from './appointment-browse-data.model'

export interface AppointmentBrowseModelConstructor {
  pagination: PaginationModelModelConstructor
  data: AppointmentBrowseDataModelConstructor[]
}

export class AppointmentBrowseModel {
  public readonly pagination: PaginationModel
  public readonly data: AppointmentBrowseDataModel[]

  constructor(params: AppointmentBrowseModelConstructor) {
    this.pagination = new PaginationModel(params.pagination)
    this.data = params.data.map((appointment) => new AppointmentBrowseDataModel(appointment))
  }
}
