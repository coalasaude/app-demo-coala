import { AppointmentQueue } from '@/v3/domain/Appointment'

import apiRequest from '../../../api'

export interface ChangeQueueAppointmentParams {
  appointmentId: number
  queue: AppointmentQueue
}

export async function changeQueueAppointment({
  appointmentId,
  ...params
}: ChangeQueueAppointmentParams) {
  await apiRequest({
    method: 'PATCH',
    throwError: true,
    path: 'v2/appointments/:appointmentId/queue',
    body: params,
    pathParams: { appointmentId },
  })
}
