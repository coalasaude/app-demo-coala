import apiRequest from '../../../api'

export interface EditAppointmentParams {
  appointmentId: number
  patientId?: number
  requesterId?: number
}

export async function editAppointment({ appointmentId, ...params }: EditAppointmentParams) {
  await apiRequest({
    method: 'PATCH',
    throwError: true,
    path: 'v2/appointments/:appointmentId',
    body: params,
    pathParams: { appointmentId },
  })
}
