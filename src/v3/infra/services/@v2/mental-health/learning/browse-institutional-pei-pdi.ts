import apiRequest from '@/services/api'
import {
  BrowseInstitutionalPeiPdiPlans,
  BrowseInstitutionalPeiPdiPlansConstructor,
} from '@/v3/domain/@v2/mental-health/learning/browse-institutional-pei-pdi.model'

type Params = {
  institutionId: number
  userId: number
  limit: number
  offset: number
  name?: string
}

type BrowseInstitutionalPeiPdiResponse = BrowseInstitutionalPeiPdiPlansConstructor

export async function browseInstitutionalPlans(params: Params) {
  const { pagination, data } = (await apiRequest({
    method: 'GET',
    throwError: true,
    path: 'v2/users/:userId/mental-health/:institutionId/institutional-plans',
    pathParams: {
      userId: params.userId,
      institutionId: params.institutionId,
    },
    queryParams: {
      limit: params.limit,
      offset: params.offset,
      name: params.name,
    },
  })) as BrowseInstitutionalPeiPdiResponse

  return new BrowseInstitutionalPeiPdiPlans({ pagination, data })
}
