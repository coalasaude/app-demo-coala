import apiRequest from '../../../api'

export interface DeleteUserExamParams {
  examId: number
  appointmentId: number
}

export async function deleteExam({ appointmentId, examId }: DeleteUserExamParams) {
  await apiRequest({
    method: 'DELETE',
    throwError: true,
    path: 'v2/appointments/:appointmentId/exams/:examId',
    pathParams: { appointmentId, examId },
  })
}
