import { TApiUserResponse } from '@/v3/domain/api/ApiUserResponse'
import { ProfessionalType } from '@/types/professionalReference'

import apiRequest from '../api'

export interface CreateUserProfessionalReferencePayload {
  professionalType: ProfessionalType
  email?: string
  name: string
  telephone: string
  userId: number
  isMePath?: boolean
}

export interface RemoveUserProfessionalReferencePayload {
  id: number
  isMePath?: boolean
}

export const createUserProfessionalReference = ({
  isMePath = true,
  ...payload
}: CreateUserProfessionalReferencePayload) =>
  apiRequest<TApiUserResponse>({
    method: 'POST',
    throwError: true,
    path: isMePath ? 'me/professional-reference' : 'professional-reference',
    getUserByRouterPath: true,
    body: {
      ...payload,
      professional_type: payload.professionalType,
      user_id: payload.userId,
    },
  })

export const createManyUserProfessionalReference = (
  payload: CreateUserProfessionalReferencePayload[]
) => Promise.all(payload.map((item) => createUserProfessionalReference(item)))

export const deleteUserProfessionalReference = ({
  id,
  isMePath = true,
}: RemoveUserProfessionalReferencePayload) =>
  apiRequest<TApiUserResponse>({
    method: 'DELETE',
    throwError: true,
    path: (isMePath ? 'me/professional-reference' : 'professional-reference') + `/${id}`,
    getUserByRouterPath: true,
  })
