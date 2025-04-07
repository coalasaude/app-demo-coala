import { TApiGeneralInformation } from '@/v3/domain/api/ApiGeneralInformation'
import { GeneralInformation } from '@/v3/domain/GeneralInformation'

import apiRequest from '../api'

export const getGeneralInformation = (userId: number) =>
  apiRequest<TApiGeneralInformation>({
    method: 'GET',
    path: `user/:userId/health-history/general-information`,
    throwError: true,
    pathParams: { userId },
  })

export const updateGeneralInformation = (payload: Partial<GeneralInformation>) =>
  apiRequest<TApiGeneralInformation>({
    method: 'PUT',
    path: `user/:userId/health-history/general-information`,
    pathParams: { userId: payload.userId },
    throwError: true,
    body: {
      blood_type: payload.bloodType,
    },
  })
