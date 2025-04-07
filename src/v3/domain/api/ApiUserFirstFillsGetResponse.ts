import { HealthHistorySteps } from '../UserHealthHistoricFills'

import { TApiUserFirstFillsResponse } from './ApiUserFirstFillsResponse'

export interface TApiUserFirstFillsGetResponse<T = HealthHistorySteps> {
  steps: TApiUserFirstFillsResponse[]
  actualStep: T
}
