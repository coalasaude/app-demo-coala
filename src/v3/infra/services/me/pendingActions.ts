import { ApiPendingActionsResponse } from '@/v3/domain/api/ApiPendingActionsResponse'

import apiRequest from '../api'

export const pendingActions = () =>
  apiRequest<ApiPendingActionsResponse>({
    path: 'me/pending-actions',
    method: 'GET',
    throwError: true,
    useApiFilters: false,
  }) as Promise<ApiPendingActionsResponse>
