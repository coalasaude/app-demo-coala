import {
  MentalHealthMedicalAnalysisModel,
  MentalHealthMedicalAnalysisModelConstructor,
} from '@/v3/domain/@v2/mental-health/reports/medical-analysis/medical-analysis-browse.model'
import apiRequest from '@/v3/infra/services/api'

export type BrowseMentalHealthMedicalAnalysisResponse = MentalHealthMedicalAnalysisModelConstructor

export interface BrowseMentalHealthMedicalAnalysisParams {
  userId: number
  requestedAnalysisId: number
}

export async function browseMentalHealthMedicalAnalysis({
  requestedAnalysisId,
  userId,
}: BrowseMentalHealthMedicalAnalysisParams) {
  const data = (await apiRequest<BrowseMentalHealthMedicalAnalysisResponse>({
    method: 'GET',
    throwError: true,
    path: 'v2/users/:userId/mental-health/medical-analysis',
    queryParams: { requestedAnalysisId },
    pathParams: { userId },
  })) as BrowseMentalHealthMedicalAnalysisResponse
  return new MentalHealthMedicalAnalysisModel(data)
}
