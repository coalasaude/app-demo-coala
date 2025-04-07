import {
  readMentalHealthReport,
  ReadMentalHealthReportParams,
} from '@/v3/infra/services/@v2/mental-health/reports/medical-reports/read-mental-health-report'
import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'

import { useFetch } from '../../../@shared/useFetch'

export const useFetchReadMentalHealthReport = (params: ReadMentalHealthReportParams) => {
  const { data, ...response } = useFetch({
    queryFn: () => readMentalHealthReport(params),
    queryKey: [QueryKeyEnum.MENTAL_HEALTH_MEDICAL_REPORT, params.userId, params],
  })

  return {
    ...response,
    medicalReport: data,
  }
}
