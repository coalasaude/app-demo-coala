import apiRequest from '../../../api'

export type EnableNotificationAppointmentResponse = boolean

export interface EnableNotificationAppointmentParams {
  appointmentId: number
}

export async function enableNotificationAppointment({
  appointmentId,
}: EnableNotificationAppointmentParams) {
  return await apiRequest<boolean>({
    method: 'GET',
    throwError: true,
    path: 'v2/appointments/:appointmentId/enable-notification',
    pathParams: { appointmentId },
  })
}
