import { ProfessionalType } from '@/types/professionalReference'
import { ProfessionalReferenceModel } from '@/v3/domain/@v2/users/professional-reference.model'

import apiRequest from '../../../api'

interface ReadUserProfessionalReferenceResponse {
  id: number
  professionalType: ProfessionalType
  name: string
  telephone: string
  userId: number
  email?: string
}

export interface ReadUserProfessionalReferenceParams {
  professionalReferenceId: number
  userId: number
}

export async function readProfessionalReference({
  userId,
  professionalReferenceId,
}: ReadUserProfessionalReferenceParams) {
  const data = (await apiRequest<ReadUserProfessionalReferenceResponse>({
    method: 'GET',
    throwError: true,
    path: 'v2/users/:userId/professional-references/:professionalReferenceId',
    pathParams: { userId, professionalReferenceId },
  })) as ReadUserProfessionalReferenceResponse

  return new ProfessionalReferenceModel({
    id: data.id,
    professionalType: data.professionalType,
    name: data.name,
    telephone: data.telephone,
    email: data.email,
  })
}
