import { ExamModel, ExamModelConstructor } from '@/v3/domain/@v2/appointment/exam.model'

import apiRequest from '../../../api'

export type ReadExamResponse = ExamModelConstructor

export interface ReadExamParams {
  examId: number
  appointmentId: number
}

export async function readExam({ appointmentId, examId }: ReadExamParams) {
  const data = (await apiRequest<ReadExamResponse>({
    method: 'GET',
    throwError: true,
    path: 'v2/appointments/:appointmentId/exams/:examId',
    pathParams: { appointmentId, examId },
  })) as ReadExamResponse

  return new ExamModel(data)
}
