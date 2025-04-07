import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import {
  BrowseInstitutionRequestedAnalysisParams,
  browseInstitutionRequestedAnalysis,
} from '@/v3/infra/services/@v2/mental-health/reports/request-analysis/browse-institution-requested-analysis'

import { useFetch } from '../../../@shared/useFetch'

export const useFetchBrowseInstitutionRequestedAnalysis = (
  params: BrowseInstitutionRequestedAnalysisParams,
) => {
  const { data, ...response } = useFetch({
    queryFn: () => browseInstitutionRequestedAnalysis(params),
    queryKey: [QueryKeyEnum.MENTAL_HEALHT_INSTITUTION_REQUESTED_ANALYSIS, params],
    refetchOnMount: true,
  })

  return {
    ...response,
    data,
  }
}
