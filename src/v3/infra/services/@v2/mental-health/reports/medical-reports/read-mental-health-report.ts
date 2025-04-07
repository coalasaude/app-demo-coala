import {
  MentalHealthMedicalReportModel,
  MentalHealthMedicalReportModelConstructor,
} from '@/v3/domain/@v2/mental-health/reports/medical-report/medical-report.model'
import apiRequest from '@/v3/infra/services/api'

export type ReadMentalHealthReportResponse = MentalHealthMedicalReportModelConstructor

export interface ReadMentalHealthReportParams {
  userId: number
  id: number
}

export async function readMentalHealthReport({ id, userId }: ReadMentalHealthReportParams) {
  const data = (await apiRequest<ReadMentalHealthReportResponse>({
    method: 'GET',
    throwError: true,
    path: 'v2/users/:userId/mental-health/medical-report/:id',
    pathParams: { userId, id },
  })) as ReadMentalHealthReportResponse

  return new MentalHealthMedicalReportModel(data)
}
