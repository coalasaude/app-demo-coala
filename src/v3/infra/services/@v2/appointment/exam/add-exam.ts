import apiRequest from '../../../api'

export interface AddExamParams {
  appointmentId: number
  description: string
  recommendation: string
  certificationPassword: string
  validUntil: Date
}

export async function addExam({ appointmentId, ...params }: AddExamParams) {
  const exam = (await apiRequest({
    method: 'POST',
    throwError: true,
    path: 'v2/appointments/:appointmentId/exams',
    body: params,
    pathParams: { appointmentId },
  })) as { id: number }

  return exam
}
