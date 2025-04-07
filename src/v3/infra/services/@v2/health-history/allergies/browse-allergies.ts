import {
  AllergyBrowseModel,
  AllergyBrowseModelConstructor,
} from '@/v3/domain/@v2/health-history/allergy/allergy-browse.model'

import apiRequest from '../../../api'

type BrowseAllergyResponse = AllergyBrowseModelConstructor

export interface BrowseAllergyParams {
  userId: number
}

export async function browseAllergy({ userId }: BrowseAllergyParams) {
  const data = (await apiRequest({
    method: 'GET',
    throwError: true,
    path: 'v2/users/:userId/health-history/allergy',
    pathParams: { userId },
  })) as BrowseAllergyResponse

  return new AllergyBrowseModel({
    pagination: data.pagination,
    data: data.data,
  })
}
