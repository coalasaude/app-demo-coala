import { TApiPlansResponse } from '@/v3/domain/api/TApiPlansResponse'

import apiRequest from './api'

export const getPlans = () =>
  apiRequest<TApiPlansResponse>({
    method: 'GET',
    path: 'plan',
  })

export const getPlanById = (planId: number) =>
  apiRequest<TApiPlansResponse>({
    method: 'GET',
    path: `plan/${planId}`,
  })
