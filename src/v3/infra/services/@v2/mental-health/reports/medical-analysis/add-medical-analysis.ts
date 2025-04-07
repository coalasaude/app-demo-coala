import {
  MentalHealthMedicalAnalysisOutputModel,
  MentalHealthMedicalAnalysisOutputModelConstructor,
} from '@/v3/domain/@v2/mental-health/reports/medical-analysis/medical-analysis-output.model'

import apiRequest from '../../../../api'

export interface AddMentalHealthMedicalAnalysisParams {
  userId: number
  analysis: string
  requestedAnalysisId: number
}

export async function addMentalHealthMedicalAnalysis({
  userId,
  ...body
}: AddMentalHealthMedicalAnalysisParams) {
  const response = (await apiRequest({
    method: 'POST',
    throwError: true,
    path: 'v2/users/:userId/mental-health/medical-analysis',
    body: body,
    pathParams: { userId },
  })) as MentalHealthMedicalAnalysisOutputModelConstructor

  return new MentalHealthMedicalAnalysisOutputModel(response)
}
