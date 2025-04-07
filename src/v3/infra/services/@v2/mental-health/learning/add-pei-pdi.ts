import apiRequest from '@/services/api'
import { BrowsePeiPdi } from '@/v3/domain/@v2/mental-health/learning'
import { AddPeiPdi } from '@/v3/domain/@v2/mental-health/learning/add-pei-pdi.model'

type AddPeiPdiParams = AddPeiPdi & {
  canCreateAi: boolean
}

export async function addPeiPdi(params: AddPeiPdiParams) {
  const peiPdi = (await apiRequest({
    method: 'POST',
    throwError: true,
    path: 'v2/users/:userId/mental-health/plan',
    pathParams: { userId: params.patientId },
    body: params,
  })) as BrowsePeiPdi

  return peiPdi
}
