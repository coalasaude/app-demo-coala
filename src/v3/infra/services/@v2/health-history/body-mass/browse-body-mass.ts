import {
  BodyMassBrowseModel,
  BodyMassBrowseModelConstructor,
} from '@/v3/domain/@v2/health-history/body-mass/body-mass-browse.model'

import apiRequest from '../../../api'

export type BrowseBodyMassResponse = BodyMassBrowseModelConstructor

export interface BrowseBodyMassParams {
  userId: number
}

export async function browseBodyMass({ userId }: BrowseBodyMassParams) {
  const data = (await apiRequest<BrowseBodyMassResponse>({
    method: 'GET',
    throwError: true,
    path: 'v2/users/:userId/health-history/body-mass',
    pathParams: { userId },
  })) as BrowseBodyMassResponse

  return new BodyMassBrowseModel({
    pagination: data.pagination,
    data: data.data,
  })
}
