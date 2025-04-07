import apiRequest from '../../../api'

export interface UpdateAppointmentComplaintParams {
  appointmentId: number
  complaintId?: number
  isAccident?: boolean
}

export async function updateAppointmentComplaint({
  appointmentId,
  ...params
}: UpdateAppointmentComplaintParams) {
  await apiRequest({
    method: 'PATCH',
    throwError: true,
    path: 'v2/appointments/:appointmentId/complaint',
    body: params,
    pathParams: { appointmentId },
  })
}
