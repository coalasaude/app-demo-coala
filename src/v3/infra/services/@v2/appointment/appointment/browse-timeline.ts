import { TimelineModel } from '@/v3/domain/@v2/appointment/timeline.model'
import { EventModelConstructor } from '@/v3/domain/@v2/appointment/event.model'

import apiRequest from '../../../api'

export type BrowseTimelineResponse = {
  data: EventModelConstructor[]
  meta: { isAuthorized: boolean }
}

export interface BrowseTimelineParams {
  appointmentId?: number
}

export async function browseTimeline({ appointmentId }: BrowseTimelineParams) {
  const response = (await apiRequest<BrowseTimelineResponse>({
    method: 'GET',
    throwError: true,
    path: 'v2/appointments/:appointmentId/timeline',
    pathParams: { appointmentId },
  })) as BrowseTimelineResponse

  return new TimelineModel({ events: response.data, meta: response.meta })
}
