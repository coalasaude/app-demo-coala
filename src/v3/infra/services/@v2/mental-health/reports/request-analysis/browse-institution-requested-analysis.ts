import { BrowseInstitutionRequestedAnalysisModel } from '@/v3/domain/@v2/mental-health/reports/request-analysis/browse-instistution-requested-analysis.model'

import apiRequest from '../../../../api'

export type BrowseInstitutionRequestedAnalysisResponse = BrowseInstitutionRequestedAnalysisModel

export interface BrowseInstitutionRequestedAnalysisParams {
  offset?: number
  limit?: number
  name?: string
  institutionId: number
}

export async function browseInstitutionRequestedAnalysis(
  params: BrowseInstitutionRequestedAnalysisParams,
) {
  const data = (await apiRequest<BrowseInstitutionRequestedAnalysisResponse>({
    method: 'GET',
    throwError: true,
    path: 'v2/institution/:institutionId/mental-health/requested-analysis',
    queryParams: params,
    pathParams: { institutionId: params.institutionId },
  })) as BrowseInstitutionRequestedAnalysisResponse

  return new BrowseInstitutionRequestedAnalysisModel(data)
}
