import { TApiUserFirstFillsGetResponse } from '@/v3/domain/api/ApiUserFirstFillsGetResponse'
import { FirstFillingStepStatus, FirstFillingType } from '@/v3/domain/UserFirstFills'
import { PersonalDataSteps } from '@/v3/domain/UserPersonalDataFills'

import apiRequest from './api'

export interface CreateHealthHistoryFirsFillingPayload {
  userId: number
  step: string
  status: FirstFillingStepStatus
  type: FirstFillingType
}

export const createUserFirsFillingStep = ({
  userId,
  ...payload
}: CreateHealthHistoryFirsFillingPayload) =>
  apiRequest({
    method: 'POST',
    path: 'user/:userId/user-first-filling',
    body: payload,
    throwError: true,
    pathParams: { userId },
  })

export const getHealthHistoryFirsFillingStep = ({ userId }: { userId: number }) =>
  apiRequest<TApiUserFirstFillsGetResponse>({
    method: 'GET',
    path: `user/:userId/user-first-filling/health-history`,
    pathParams: { userId },
  })

export const getPersonalDataFirsFillingStep = ({ userId }: { userId: number }) =>
  apiRequest<TApiUserFirstFillsGetResponse<PersonalDataSteps>>({
    method: 'GET',
    path: `user/:userId/user-first-filling/personal-data`,
    pathParams: { userId },
  })
