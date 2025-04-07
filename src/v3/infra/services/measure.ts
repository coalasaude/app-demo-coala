import { TBodyMass } from '@/v3/domain/api/ApiBodyMassResponse'

import apiRequest from './api'

export const getBodyMass = (userId: number) =>
  apiRequest<{ count: number; results: TBodyMass[] }>({
    method: 'GET',
    path: `user/:userId/health-history/measure/body-mass-index`,
    pathParams: { userId },
  })

export const removeBodyMass = (userId: number, id: number) =>
  apiRequest<TBodyMass>({
    method: 'DELETE',
    path: `user/:userId/health-history/measure/body-mass-index/:id`,
    pathParams: { userId, id },
  })

export const postBodyMass = (payload: {
  userId: number
  weight: number
  height: number
  measurement_date: Date
}) =>
  apiRequest<TBodyMass>({
    method: 'POST',
    throwError: true,
    path: `user/:userId/health-history/measure/body-mass-index/`,
    pathParams: { userId: payload.userId },
    body: {
      weight: payload.weight,
      height: payload.height,
      measurement_date: payload.measurement_date,
    },
  })
