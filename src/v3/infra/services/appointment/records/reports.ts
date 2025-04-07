import apiRequest from '../../api'

type AddReportParams = {
  appointmentId: number
  data: {
    title: string
    certificatePass: string
    body: string
  }
}

export function addReport({ appointmentId, data }: AddReportParams) {
  return apiRequest({
    path: 'appointments/:id/reports',
    method: 'POST',
    pathParams: { id: appointmentId },
    body: {
      ...data,
      certification_password: data.certificatePass,
      appointment_id: appointmentId,
    },
  })
}
