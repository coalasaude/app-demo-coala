import {
  LastUpdateHealthHistory,
  LastUpdateHealthHistoryConstructor,
} from '@/v3/domain/@v2/pdf/last-update-health-history.model'

import apiRequest from '../../api'

export interface IGetLastUpdateLastHistoryPayload {
  institutionsIds: number[]
}

export const getLastUpdateLastHistory = async (params: IGetLastUpdateLastHistoryPayload) => {
  const data = (await apiRequest<LastUpdateHealthHistoryConstructor[]>({
    path: 'v2/pdfs/reports/last-update-health-history',
    method: 'GET',
    throwError: true,
    queryParams: params,
  })) as unknown as LastUpdateHealthHistoryConstructor

  return new LastUpdateHealthHistory(data)
}
