import { browseReportProfiles } from '@/v3/infra/services/@v2/mental-health/reports/browse-report-profiles'
import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'

import { useFetch } from '../../@shared/useFetch'

export const useFetchBrowseReportProfiles = () => {
  const { data, ...response } = useFetch({
    queryFn: () => {
      return browseReportProfiles()
    },
    queryKey: [QueryKeyEnum.MENTAL_HEALTH_REPORT_PROFILE],
  })

  return {
    ...response,
    profiles: data,
  }
}
