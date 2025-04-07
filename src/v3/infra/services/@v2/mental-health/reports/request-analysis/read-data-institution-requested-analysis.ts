import apiRequest from '@/v3/infra/services/api'

export type ReadDataInstitutionRequestedAnalysisResponse = {
  awaitingAnalysis: number
  availableAnalysis: number
  reportsAdded: number
}

export interface ReadDataInstitutionRequestedAnalysisParams {
  institutionId: number
}

export async function readDataInstitutionRequestedAnalysis({
  institutionId,
}: ReadDataInstitutionRequestedAnalysisParams) {
  const data = (await apiRequest<ReadDataInstitutionRequestedAnalysisResponse>({
    method: 'GET',
    throwError: true,
    path: 'v2/institution/:institutionId/mental-health/requested-analysis/data-institution',
    pathParams: { institutionId },
  })) as ReadDataInstitutionRequestedAnalysisResponse

  return data
}
