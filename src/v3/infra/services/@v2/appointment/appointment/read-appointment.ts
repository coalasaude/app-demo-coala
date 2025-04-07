import {
  AppointmentReadModel,
  AppointmentReadModelConstructor,
} from '@/v3/domain/@v2/appointment/appointment-read.model'

import apiRequest from '../../../api'

export type ReadAppointmentResponse = AppointmentReadModelConstructor

export interface ReadAppointmentParams {
  appointmentId: number
}

export async function readAppointment({ appointmentId }: ReadAppointmentParams) {
  const data = (await apiRequest<ReadAppointmentResponse>({
    method: 'GET',
    throwError: true,
    path: 'v2/appointments/:appointmentId',
    pathParams: { appointmentId },
  })) as ReadAppointmentResponse

  return new AppointmentReadModel(data)
}
