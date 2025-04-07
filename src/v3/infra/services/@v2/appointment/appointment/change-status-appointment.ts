import { AppointmentFinishedStatus } from '@/constants/appointment'
import { AppointmentStatus } from '@/v3/domain/Appointment'

import apiRequest from '../../../api'

export interface ChandeStatusAppointmentParams {
  appointmentId: number
  status: AppointmentStatus
  finishedReason?: AppointmentFinishedStatus | null
}

export async function changeStatusAppointment({
  appointmentId,
  ...params
}: ChandeStatusAppointmentParams) {
  await apiRequest({
    method: 'PATCH',
    throwError: true,
    path: 'v2/appointments/:appointmentId/status',
    body: params,
    pathParams: { appointmentId },
  })
}
