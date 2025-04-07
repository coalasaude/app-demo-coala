import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import {
  browseTimeline,
  BrowseTimelineParams,
} from '@/v3/infra/services/@v2/appointment/appointment/browse-timeline'
import { RecordsType } from '@/types/records'

import { useFetch } from '../../@shared/useFetch'

export const useFetchBrowseTimeline = (params: BrowseTimelineParams) => {
  const { data, ...response } = useFetch({
    queryFn: () => {
      if (!params.appointmentId) return Promise.resolve(null)
      return browseTimeline(params)
    },
    queryKey: [QueryKeyEnum.TIMELINE, params.appointmentId],
  })

  const timelineWithoutAttachments = data?.records.filter(
    ({ data }) => data.recordType !== RecordsType.ATTACHMENTS,
  )

  return {
    ...response,
    timeline: data,
    timelineWithoutAttachments,
  }
}
