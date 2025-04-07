import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import {
  browseReportTimeline,
  BrowseReportTimelineParams,
} from '@/v3/infra/services/@v2/mental-health/reports/timeline/browse-report-timeline'

import { useFetch } from '../../../@shared/useFetch'

export const useFetchBrowseReportTimeline = (params: BrowseReportTimelineParams) => {
  const { data, ...response } = useFetch({
    queryFn: () => browseReportTimeline(params),
    queryKey: [QueryKeyEnum.MENTAL_HEALTH_REPORT_TIMELINE, params.userId, params],
  })

  return {
    ...response,
    timeline: data?.data || [],
    data: data,
  }
}
