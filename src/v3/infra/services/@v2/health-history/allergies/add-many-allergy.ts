import apiRequest from '../../../api'

import { AddAllergyParams } from './add-allergy'

type AddAllergy = Omit<AddAllergyParams, 'userId'>

export interface AddManyAllergyParams {
  userId: number
  allergies: AddAllergy[]
}

export async function addManyAllergy({ userId, allergies }: AddManyAllergyParams) {
  await apiRequest({
    method: 'POST',
    throwError: true,
    path: 'v2/users/:userId/health-history/allergy/many',
    body: { allergies },
    pathParams: { userId },
  })
}
