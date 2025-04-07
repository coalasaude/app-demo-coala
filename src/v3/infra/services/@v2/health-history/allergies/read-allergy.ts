import {
  AllergyModel,
  AllergyModelConstructor,
} from '@/v3/domain/@v2/health-history/allergy/allergy.model'

import apiRequest from '../../../api'

export type ReadAllergyResponse = AllergyModelConstructor

export interface ReadAllergyParams {
  allergyId: number
  userId: number
}

export async function readAllergy({ userId, allergyId }: ReadAllergyParams) {
  const data = (await apiRequest<ReadAllergyResponse>({
    method: 'GET',
    throwError: true,
    path: 'v2/users/:userId/health-history/allergy/:allergyId',
    pathParams: { userId, allergyId },
  })) as ReadAllergyResponse

  return new AllergyModel(data)
}
