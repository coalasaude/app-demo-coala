import apiRequest from '../../api'

type AddExamParams = {
  appointmentId: number
  data: {
    valid_until: string
    certificatePass: string
    description: string
    recommendation: string
  }
}

export function addExam({ appointmentId, data }: AddExamParams) {
  return apiRequest({
    path: 'appointments/:id/exams',
    method: 'POST',
    pathParams: {
      id: appointmentId,
    },
    body: {
      ...data,
      certification_password: data.certificatePass,
      valid_until: Number(data.valid_until),
      appointment_id: appointmentId,
    },
  })
}
