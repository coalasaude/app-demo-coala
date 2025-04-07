import {
  MentalHealthTimelineBrowseModel,
  MentalHealthTimelineBrowseModelConstructor,
} from '@/v3/domain/@v2/mental-health/reports/timeline/mental-health-timeline-browse.model'
import apiRequest from '@/v3/infra/services/api'

export type BrowseReportTimelineResponse = MentalHealthTimelineBrowseModelConstructor

export interface BrowseReportTimelineParams {
  userId: number
}

export async function browseReportTimeline({ userId }: BrowseReportTimelineParams) {
  const response = (await apiRequest<BrowseReportTimelineResponse>({
    method: 'GET',
    throwError: true,
    path: 'v2/users/:userId/mental-health/timeline',
    pathParams: {
      userId,
    },
  })) as BrowseReportTimelineResponse

  return new MentalHealthTimelineBrowseModel(response)
}
