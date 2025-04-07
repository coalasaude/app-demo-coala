import { TApiAllergyOptionsResponse } from '@/v3/domain/api/ApiAllergyOptionsResponse'
import { TApiAllergylistResponse } from '@/v3/domain/api/ApiAllergyListResponse'

import apiRequest from './api'

export interface CreateAllergyPayload {
  causerAgent: string
  symptom: number[]
  orientations: string
  categoryId: number
  userId: number
}

export type CreateManyAllergyPayload = {
  allergies: Omit<CreateAllergyPayload, 'userId'>[]
  userId: number
}

export const getAllergyList = async ({
  orderByField,
  filters,
  limit,
  offset,
  userId,
}: {
  userId: number
  orderByField?: string
  limit?: number
  offset?: number
  filters?: Record<string, any>
}) => {
  return apiRequest<TApiAllergylistResponse>({
    path: `user/${userId}/health-history/allergy`,
    method: 'GET',
    useApiFilters: true,
    queryParams: {
      ...filters,
      limit,
      offset,
      order_by: orderByField,
    },
  })
}

export const getAllergyOptions = ({ userId }: { userId: number }) =>
  apiRequest<TApiAllergyOptionsResponse>({
    method: 'GET',
    path: `user/${userId}/health-history/allergy/options`,
  })

export const createAllergy = ({ userId, ...payload }: CreateAllergyPayload) =>
  apiRequest({
    method: 'POST',
    path: 'user/:userId/health-history/allergy',
    body: payload,
    throwError: true,
    pathParams: { userId },
  })

export const createManyAllergy = ({ userId, ...payload }: CreateManyAllergyPayload) =>
  apiRequest({
    method: 'POST',
    path: 'user/:userId/health-history/allergy/many',
    body: payload,
    throwError: true,
    pathParams: { userId },
  })

export const removeAllergy = (id: number, userId: number) =>
  apiRequest({
    method: 'DELETE',
    path: `user/:userId/health-history/allergy/${id}`,
    useApiFilters: true,
    throwError: true,
    pathParams: { userId },
  })
