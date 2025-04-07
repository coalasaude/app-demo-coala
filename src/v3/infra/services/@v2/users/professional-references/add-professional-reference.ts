import { ProfessionalType } from '@/types/professionalReference'

import apiRequest from '../../../api'

export interface AddUserProfessionalReferenceParams {
  userId: number
  name: string
  telephone: string
  professionalType: ProfessionalType
  email?: string
}

export async function addProfessionalReference({
  userId,
  ...params
}: AddUserProfessionalReferenceParams) {
  await apiRequest({
    method: 'POST',
    throwError: true,
    path: 'v2/users/:userId/professional-references',
    body: params,
    pathParams: { userId },
  })
}
