import {
  readReportRequestAnalysis,
  ReadReportRequestAnalysisParams,
} from '@/v3/infra/services/@v2/mental-health/reports/request-analysis/read-request-analysis'
import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'

import { useFetch } from '../../../@shared/useFetch'

export const useFetchReadReportRequestAnalysis = (params: ReadReportRequestAnalysisParams) => {
  const { data, ...response } = useFetch({
    queryFn: () => readReportRequestAnalysis(params),
    queryKey: [QueryKeyEnum.MENTAL_HEALTH_REPORTS_REQUEST_ANALYSIS, params.userId, params],
  })

  return {
    ...response,
    requestAnalysis: data,
  }
}
