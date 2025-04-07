import apiRequest from '../../../api'

import { AddDiseaseParams } from './add-disease'

type AddDisease = Omit<AddDiseaseParams, 'file' | 'userId'> & { documentId?: number }

export interface AddManyDiseaseParams {
  userId: number
  diseases: AddDisease[]
}

export async function addManyDisease({ userId, diseases }: AddManyDiseaseParams) {
  await apiRequest({
    method: 'POST',
    throwError: true,
    path: 'v2/users/:userId/health-history/diseases/many',
    body: { diseases },
    pathParams: { userId },
  })
}
