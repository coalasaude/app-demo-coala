import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import {
  readReport,
  ReadReportParams,
} from '@/v3/infra/services/@v2/appointment/report/read-report'

import { useFetch } from '../../@shared/useFetch'

export const useFetchReadReport = (params: ReadReportParams) => {
  const { data, ...response } = useFetch({
    queryFn: () => readReport(params),
    queryKey: [QueryKeyEnum.APPOINTMENT_REPORT, params.appointmentId, params.reportId],
  })

  return {
    ...response,
    report: data,
  }
}
