import apiRequest from '../../../api'

export interface RegenerateUserExamParams {
  examId: number
  appointmentId: number
}

export async function regenerateExam({ appointmentId, examId }: RegenerateUserExamParams) {
  await apiRequest({
    method: 'POST',
    throwError: true,
    path: 'v2/appointments/:appointmentId/exams/:examId/regenerate',
    pathParams: { appointmentId, examId },
  })
}
