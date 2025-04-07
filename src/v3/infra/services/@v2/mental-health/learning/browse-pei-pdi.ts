import apiRequest from '@/services/api'
import {
  BrowsePlan,
  BrowsePlanConstructor,
} from '@/v3/domain/@v2/mental-health/learning/browse-plan.model'

type BrowsePeiPdiParams = {
  userId: number
}

type BrowsePeiPdiResponse = BrowsePlanConstructor

export async function browsePeiPdi(params: BrowsePeiPdiParams) {
  const peiPdi = (await apiRequest({
    method: 'GET',
    throwError: true,
    path: 'v2/users/:userId/mental-health/plan',
    pathParams: { userId: params.userId },
  })) as BrowsePeiPdiResponse

  return new BrowsePlan({
    count: peiPdi.count,
    result: peiPdi.result,
  })
}
