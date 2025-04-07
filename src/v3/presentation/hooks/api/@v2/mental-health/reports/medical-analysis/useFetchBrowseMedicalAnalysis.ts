import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import {
  browseMentalHealthMedicalAnalysis,
  BrowseMentalHealthMedicalAnalysisParams,
} from '@/v3/infra/services/@v2/mental-health/reports/medical-analysis/browse-medical-analysis'

import { useFetch } from '../../../@shared/useFetch'

export const useFetchBrowseMentalHealthMedicalAnalysis = (
  params: BrowseMentalHealthMedicalAnalysisParams,
) => {
  const { data, ...response } = useFetch({
    queryFn: () => browseMentalHealthMedicalAnalysis(params),
    queryKey: [QueryKeyEnum.MENTAL_HEALTH_REPORTS_MEDICAL_ANALYSIS, params.userId, params],
  })

  return {
    ...response,
    medicalAnalyses: data,
  }
}
