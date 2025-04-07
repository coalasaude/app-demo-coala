import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import {
  ReadDataInstitutionRequestedAnalysisParams,
  readDataInstitutionRequestedAnalysis,
} from '@/v3/infra/services/@v2/mental-health/reports/request-analysis/read-data-institution-requested-analysis'

import { useFetch } from '../../../@shared/useFetch'

export const useFetchReadDataInstitutionRequestedAnalysis = (
  params: ReadDataInstitutionRequestedAnalysisParams,
) => {
  const { data, ...response } = useFetch({
    queryFn: () => readDataInstitutionRequestedAnalysis(params),
    queryKey: [
      QueryKeyEnum.MENTAL_HEALTH_DATA_INSTITUTION_REQUESTED_ANALYSIS,
      params.institutionId,
      params,
    ],
    refetchOnMount: true,
  })

  return {
    ...response,
    data,
  }
}
