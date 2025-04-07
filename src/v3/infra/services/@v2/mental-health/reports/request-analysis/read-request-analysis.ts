import {
  MentalHealthRequestedAnalysisModel,
  MentalHealthRequestedAnalysisModelConstructor,
} from '@/v3/domain/@v2/mental-health/reports/request-analysis/request-analysis.model'
import apiRequest from '@/v3/infra/services/api'

export type ReadReportRequestAnalysisResponse = MentalHealthRequestedAnalysisModelConstructor

export interface ReadReportRequestAnalysisParams {
  userId: number
  id: number
}

export async function readReportRequestAnalysis({ id, userId }: ReadReportRequestAnalysisParams) {
  const data = (await apiRequest<ReadReportRequestAnalysisResponse>({
    method: 'GET',
    throwError: true,
    path: 'v2/users/:userId/mental-health/requested-analysis/:id',
    pathParams: { userId, id },
  })) as ReadReportRequestAnalysisResponse

  return new MentalHealthRequestedAnalysisModel(data)
}
