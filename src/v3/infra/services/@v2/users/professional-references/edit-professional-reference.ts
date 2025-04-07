import { ProfessionalType } from '@/types/professionalReference'

import apiRequest from '../../../api'

export interface EditUserProfessionalReferenceParams {
  professionalReferenceId: number
  userId: number
  name: string
  telephone: string
  professionalType: ProfessionalType
  email?: string
}

export async function editProfessionalReference({
  userId,
  professionalReferenceId,
  ...params
}: EditUserProfessionalReferenceParams) {
  await apiRequest({
    method: 'PUT',
    throwError: true,
    path: 'v2/users/:userId/professional-references/:professionalReferenceId',
    body: params,
    pathParams: { userId, professionalReferenceId },
  })
}
