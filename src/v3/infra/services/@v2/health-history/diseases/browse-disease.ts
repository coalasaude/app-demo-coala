import {
  DiseaseBrowseModel,
  DiseaseBrowseModelConstructor,
} from '@/v3/domain/@v2/health-history/disease/disease-browse.model'

import apiRequest from '../../../api'

type BrowseDiseaseResponse = DiseaseBrowseModelConstructor

export interface BrowseDiseaseParams {
  userId: number
}

export async function browseDisease({ userId }: BrowseDiseaseParams) {
  const data = (await apiRequest({
    method: 'GET',
    throwError: true,
    path: 'v2/users/:userId/health-history/diseases',
    pathParams: { userId },
  })) as BrowseDiseaseResponse

  return new DiseaseBrowseModel({
    pagination: data.pagination,
    data: data.data,
  })
}
